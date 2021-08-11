import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const { addTransaction, editItem, editTransaction } =
    useContext(GlobalContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (editItem) {
      setText(editItem.text);
      setAmount(editItem.amount);
    } else {
      setText("");
      setAmount(0);
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editItem) {
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
    } else {
      const editedTransaction = {
        id: editItem.id,
        text: text,
        amount: parseInt(amount),
      };
      editTransaction(editedTransaction);
    }

    setText("");
    setAmount(0);
  };

  return (
    <>
      <h3>{editItem ? "Edit transaction" : "Add new transaction"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
