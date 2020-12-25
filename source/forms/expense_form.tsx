import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteExpense, updateExpense } from "../requests";
import { Expense } from "../types";
import { formatDate } from "../utilities";
import { Buttons, Container } from "./expense_form.styles";

export interface ExpenseFormArgs {
    expense: Expense;
}

export default function ExpenseForm({ expense }: ExpenseFormArgs) {
    const history = useHistory();
    const [transactionDate, setTransactionDate] = useState<string>(
        expense.transactionDate
    );
    const [type, setType] = useState<string>(expense.type);
    const [amount, setAmount] = useState<number>(expense.amount);
    const [currency, setCurrency] = useState<string>(expense.currency);
    const [recipient, setRecipient] = useState<string>(expense.recipient);
    const [updated, setUpdated] = useState<number | undefined>();

    useEffect(() => {
        if (updated != undefined) {
            const id = setTimeout(() => {
                setUpdated(undefined);
            }, 2000);
            return () => clearTimeout(id);
        }
    }, [updated]);

    const deleteItem = () => {
        deleteExpense(expense.id);
        history.push("/");
    };
    const updateItem = () => {
        updateExpense({
            ...expense,
            transactionDate,
            type,
            amount,
            currency,
            recipient,
        });
        setUpdated(updated ? updated + 1 : 1);
    };

    return (
        <>
            <Container>
                <label htmlFor="id">ID: </label>
                <div id="id">{expense.id}</div>
                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="date">Date:</label>
                <input
                    type="string"
                    id="date"
                    value={formatDate(transactionDate)}
                    onChange={(e) => setTransactionDate(e.target.value)}
                />
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
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
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                />
                <label htmlFor="recipient">Recipient:</label>
                <input
                    type="string"
                    id="recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
            </Container>
            <Buttons>
                <button onClick={deleteItem}>Delete</button>
                <button onClick={updateItem}>Update</button>
                {updated && <div>Updated</div>}
            </Buttons>
        </>
    );
}
