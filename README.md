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

- Implement Header component
- Copy the CSS styles from Vanilla javascript expense tracker
- Copy the Balance code with class names and put the Balance component under container in App.js
- Follow the same approach for IncomeExpenses component.
- Transactions will actually have one parent transactions list component, and a child single transaction component.
- AddTranaction component will contain the heading and form.
- Don't need IDs anymore that were previously used to grab DOM elements with Vanilla Javascript. Replace the class attribute with className, and for attribute with htmlFor.
- Need a component level state to store user input of text and amount, import useState hook.
- View the components in chrome dev tools under components tab. Click on the `AddTransaction` component to visualize the component state.

---
