import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteExpense, updateExpense } from "../requests";
import { Expense } from "../types";
import { formatDateLong } from "../utilities";

export interface ExpenseFormArgs {
    expense: Expense;
}

export default function ExpenseForm({ expense }: ExpenseFormArgs) {
    const history = useHistory();
    const [amount, setAmount] = useState<number>(expense.amount);
    const [currency, setCurrency] = useState<string>(expense.currency);
    const [recipient, setRecipient] = useState<string>(expense.recipient);

    const deleteItem = () => {
        deleteExpense(expense.id);
        history.push("/");
    };
    const updateItem = () => {
        updateExpense({
            ...expense,
            amount,
            currency,
            recipient,
        });
        history.push("/");
    };

    return (
        <>
            <div>ID: {expense.id}</div>
            <div>Date: {formatDateLong(expense.transactionDate)}</div>
            <div>Type: {expense.type}</div>
            <label htmlFor="amount">Amount:</label>
            <input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value)) {
                        setAmount(value);
                    }
                }}
            />
            <label htmlFor="currency">Currency:</label>
            <input
                type="string"
                name="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />
            <label htmlFor="recipient">Recipient:</label>
            <input
                type="string"
                name="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />

            <div>
                <button onClick={deleteItem}>Delete</button>
                <button onClick={updateItem}>Update</button>
            </div>
        </>
    );
}
