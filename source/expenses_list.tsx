import React, { useEffect, useState } from "react";
import { Expense } from "./types";

export default function ExpensesList() {
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState<Expense[] | undefined>();
    useEffect(() => {
        async function fetchExpenses() {
            const response = await fetch("http://localhost:3000/expenses");
            const result = (await response.json()) as Expense[];
            setExpenses(result);
            setLoading(false);
        }

        fetchExpenses();
    }, []);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {expenses && (
                        <ul>
                            {expenses.map((expense) => (
                                <li key={expense.id}>
                                    {expense.transactionDate}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}
