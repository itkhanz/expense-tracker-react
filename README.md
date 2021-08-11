## Expense Tracker

A React.js application that manages the state using Context API and React Hooks (useState, useContext, useReducer).

## Project Specifications

- Create UI for project
- Display transaction items in DOM
- Show balance, expense and income totals
- Add new transation and reflect in total
- Delete items from DOM

---

## Project Planning

- Break the UI into component.

  - Header
  - Balance
  - Income/Expense
  - Transaction List -> Transaction
  - Add Transaction

---

## Creating Components

- Implement `Header` component
- Copy the CSS styles from [Vanilla javascript expense tracker](https://github.com/itkhanz/webProjects-vanillaJS/tree/main/expense-tracker)
- Copy the `Balance` code with class names and put the Balance component under container in App.js
- Follow the same approach for `IncomeExpenses` component.
- Transactions will actually have one parent transactions list component, and a child single transaction component.
- `AddTranaction` component will contain the heading and form.
- Don't need IDs anymore that were previously used to grab DOM elements with Vanilla Javascript. Replace the class attribute with `className`, and for attribute with `htmlFor`.
- Need a component level state to store user input of text and amount, import `useState` hook.
- View the components in chrome dev tools under components tab. Click on the `AddTransaction` component and under Hooks you can visualize the component state.

---

## Global Context state

- we could put the state in App component and prop drill to the child compionents.
- For larger applications, `Context API` and `Redux` is usually used.
- Create a `context` folder - > `GlobalState.js` and put the state. For larger applications, we might have different contexts.
- We just need transactions list as initial state, other stuff can be calculated from it.
- create a `GlobalContext` and `GlobalProvider` and manage the state via `useReducer(reducer, initialState)`.
- pass the `props.children` to GlobalProvider so the child components can access the state without having to manually pass the state.
    <details>
    <summary>Click to expand</summary>

  ```javascript
  import React, { Children, createContext, useReducer } from "react";

  // initial State
  const initialState = {
    transactions: [
      { id: 1, text: "Flower", amount: -20 },
      { id: 2, text: "Salary", amount: 300 },
      { id: 3, text: "Book", amount: -10 },
      { id: 4, text: "Camera", amount: 150 },
    ],
  };

  // create context
  export const GlobalContext = createContext(initialState);

  // Provider Component
  export const GlobalProvider = ({ childres }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
      <GlobalContext.Provider value={{ transactions: state.transactions }}>
        {children}
      </GlobalContext.Provider>
    );
  };
  ```

    </details>

- Instead of putting the reducer in same file, create a seprata `Appreducer` file and import it into the `GlobalContext. Reducer specifies how the state changes in response to certain actions.

  ```javascript
  export default (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  ```

- We are passing the `AppReducer` to the `useReducer(AppReducer, initialState)` and then we can access the `state` values from the `initialState` and passing it to the value of `GlobalProvider`

- Wrap all the components in App.js under the `GlobalProvider`.
- Open the chrome dev tools, and go to GlobalProvider -> hooks -> Reducer -> there we have the transactions that are accessable to all the child components.

---

## Using the Global State to display transactions

- You can access the state using the `useContext` hook and pass our `GlobalContext` to it. context will return us our transactions global state object and we cam use it accordingly. Destructure it to get the tranactions array.
- Loop through the transactions array, and display the transactions:
- Create a seprate component for the `Transaction` and pass it to to the map function with transaction prop. Each list item in the output of map should have a unique key.

    <details>
    <summary>Click to expand</summary>

  ```javascript
  import React from "react";

  export const Transaction = ({ transaction }) => {
    const sign = transaction.amount < 0 ? "-" : "+";

    return (
      <>
        <li className={transaction.amount < 0 ? "minus" : "plus"}>
          {transaction.text}{" "}
          <span>
            {sign}${Math.abs(transaction.amount)}
          </span>
          <button className="delete-btn">x</button>
        </li>
      </>
    );
  };
  ```

    </details>

---

## Show the Balance, and Income/Expense

- Import the `GlobalContext` into the components, and use the `useContext` hook to access the transactions.
- Copy the logic from Vanilla JS for calculation of the total balance, income and expense.
- Whats nice about the react is that we do not need to update these values mannual any time a transaction is added or delete, React will update the state and rerender itself.

---

## Delete Transaction

- We need to have `action` in our global state. Inside the `GlobalProvider` component, define the actions that will be dispatched to reducer.

  ```javascript
  //Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }
  ```

- create a case for delete transactions in reducer. Reducer just changes the state and pass it down to components. We have to create a new state and send it down. We are dispatching our action with a type and payload ID so we can just filter out the transactions based on payload ID.

  ```javascript
  case "DELETE_TRANSACTION":
  return {
    ...state,
    transactions: state.transactions.filter(
      (transaction) => transaction.id !== action.payload
    ),
  };
  ```

- Back in the `GlobalState` in order for us to use the `deleteTransaction`, we have to pass it down to `Provider` as a value.

- we can use this `deleteTransaction` inside the `Transaction` component by the `useContext` hook with the `onClick` event handler on delete button.

---

## ADD Transaction

- Make a dispatcher function for add transaction in a similiar way except this time the payload will be whole transaction instead of id.
- In the reducer action, we basically want to return the transactions that are already there in addition to a new tranaction in payload.
  ```javascript
  case "ADD_TRANSACTION":
        return {
          ...state,
          transactions: [...state.transactions, action.payload],
        };
  ```
- import the addTransaction action using the useContext hook inside the AddTransaction component.
- write a function to handle the form submission, and call the addTransaction dispatcher action in it.

    <details>
    <summary>Click to expand</summary>

  ```javascript
  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "" || amount.trim() === "") {
      alert("Please add a text and amount");
    } else {
      const newTransaction = {
        id: Math.floor(Math.random() * 100000000),
        text: text,
        amount: parseInt(amount),
      };
      addTransaction(newTransaction);
    }

    setText("");
    setAmount(0);
  };
  ```

    </details>

- remove the dummy transactions from the global state that were used for the dvelopment purposes.
