import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { FaEdit } from "react-icons/fa";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction, findItem } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <>
      {/* <img src={require("./pen.png")} /> */}
      <li className={transaction.amount < 0 ? "minus" : "plus"}>
        {transaction.text}{" "}
        <span>
          {sign}${Math.abs(transaction.amount)}
        </span>
        <button
          className="delete-btn"
          onClick={() => deleteTransaction(transaction.id)}
        >
          x
        </button>
        <button className="edit-btn" onClick={() => findItem(transaction)}>
          <FaEdit />
        </button>
      </li>
    </>
  );
};
