import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useExpense from "./hooks/use_expense";
import { deleteExpense } from "./requests";
import { formatDateLong, isEmpty } from "./utilities";

interface IndividualExpenseParams {
    id?: string;
}

export default function IndividualExpense() {
    const { id } = useParams<IndividualExpenseParams>();
    const { loading, expense } = useExpense(id);
    const history = useHistory();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!expense || isEmpty(expense)) {
        return <div>Not found.</div>;
    }

    const deleteItem = () => {
        deleteExpense(expense.id);
        history.push("/");
    };

    return (
        <>
            <div>ID: {expense.id}</div>
            <div>Date: {formatDateLong(expense.transactionDate)}</div>
            <div>Type: {expense.type}</div>
            <div>Amount: {expense.amount}</div>
            <div>Currency: {expense.currency}</div>
            <div>Recipient: {expense.recipient}</div>
            <div>
                <button onClick={deleteItem}>Delete</button>
            </div>
        </>
    );
}
