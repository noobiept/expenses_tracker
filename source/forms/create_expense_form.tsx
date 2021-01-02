import React, { useState } from "react";
import { logError } from "../log";
import { createExpense } from "../requests";
import { ErrorMessage } from "../styles";
import { Buttons, Container } from "./update_expense_form.styles";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

export default function CreateExpenseForm() {
    const history = useHistory();
    const [type, setType] = useState<string | undefined>();
    const [amount, setAmount] = useState<number | undefined>();
    const [currency, setCurrency] = useState<string | undefined>();
    const [recipient, setRecipient] = useState<string | undefined>();
    const [error, setError] = useState(false);

    const createItem = async () => {
        setError(false);

        try {
            await createExpense({
                id: uuidv4(),
                transactionDate: new Date().getTime(),
                amount,
                recipient,
                currency,
                type,
            });
            history.push("/");
        } catch (err) {
            setError(true);
            logError(err.message);
        }
    };

    return (
        <>
            <Container>
                <label htmlFor="type">Type:</label>
                <input
                    type="text"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
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
                <button onClick={createItem}>Create</button>
                {error && (
                    <ErrorMessage>
                        -- Failed to create the new expense --
                    </ErrorMessage>
                )}
            </Buttons>
        </>
    );
}
