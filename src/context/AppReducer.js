import React from "react";

export default (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "EDIT_TRANSACTION":
      // console.log(action.payload);
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction.id === action.payload.id
            ? {
                id: transaction.id,
                text: action.payload.text,
                amount: action.payload.amount,
              }
            : transaction
        ),
      };
    default:
      return state;
  }
};
