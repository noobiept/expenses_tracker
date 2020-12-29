import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { logError } from "../log";
import { deleteExpense, updateExpense } from "../requests";
import { ErrorMessage } from "../styles";
import { Expense } from "../types";
import { formatDate, formatValue } from "../utilities";
import { Buttons, Container } from "./expense_form.styles";

export interface ExpenseFormArgs {
    expense: Expense;
}

export default function ExpenseForm({ expense }: ExpenseFormArgs) {
    const history = useHistory();
    const [transactionDate, setTransactionDate] = useState<string | undefined>(
        expense.transactionDate
    );
    const [type, setType] = useState<string | undefined>(expense.type);
    const [amount, setAmount] = useState<number | undefined>(expense.amount);
    const [currency, setCurrency] = useState<string | undefined>(
        expense.currency
    );
    const [recipient, setRecipient] = useState<string | undefined>(
        expense.recipient
    );
    const [updated, setUpdated] = useState<number | undefined>();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (updated != undefined) {
            const id = setTimeout(() => {
                setUpdated(undefined);
            }, 2000);
            return () => clearTimeout(id);
        }
    }, [updated]);

    const deleteItem = async () => {
        if (!window.confirm("Delete expense?")) {
            return;
        }

        setError(false);

        try {
            await deleteExpense(expense.id);
            history.push("/");
        } catch (err) {
            setError(true);
            logError(err.message);
        }
    };
    const updateItem = async () => {
        setError(false);

        try {
            await updateExpense({
                ...expense,
                transactionDate,
                type,
                amount,
                currency,
                recipient,
            });
            setUpdated(updated ? updated + 1 : 1);
        } catch (err) {
            setError(true);
            logError(err.message);
        }
    };

    return (
        <>
            <Container>
                <label htmlFor="id">ID: </label>
                <div id="id">{formatValue(expense.id)}</div>
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
                {error && (
                    <ErrorMessage>
                        -- Failed to execute the operation ---
                    </ErrorMessage>
                )}
            </Buttons>
        </>
    );
}
