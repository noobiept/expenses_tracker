import React from "react";
import { useParams } from "react-router-dom";
import useExpense from "./hooks/use_expense";
import { Expense } from "./types";

interface ExpenseParams {
    id?: string;
}

export default function Expense() {
    const { id } = useParams<ExpenseParams>();
    const { loading, expense } = useExpense(id);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!expense) {
        return <div>Not found.</div>;
    }

    return (
        <>
            <div>ID: {expense.id}</div>
            <div>Date: {expense.transactionDate}</div>
        </>
    );
}
