import React, {
  Children,
  createContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import AppReducer from "./AppReducer";

// initial State
const initialState = {
  transactions: [
    // { id: 1, text: "Flower", amount: -20 },
    // { id: 2, text: "Salary", amount: 300 },
    // { id: 3, text: "Book", amount: -10 },
    // { id: 4, text: "Camera", amount: 150 },
  ],
};

// create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const [editItem, seteditItem] = useState(null);

  // useEffect(() => {
  //   console.log(editItem);
  // }, [editItem]);

  // Find transaction
  const findItem = (transaction) => {
    seteditItem(transaction);
    // console.log(editItem);
  };

  //Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }
  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }
  function editTransaction(transaction) {
    dispatch({
      type: "EDIT_TRANSACTION",
      payload: transaction,
    });
    seteditItem(null);
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        findItem,
        editItem,
        editTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
