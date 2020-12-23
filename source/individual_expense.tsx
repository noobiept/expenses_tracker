import React from "react";
import { useHistory, useParams } from "react-router-dom";
import ExpenseForm from "./forms/expense_form";
import useExpense from "./hooks/use_expense";
import { isEmpty } from "./utilities";

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

    return (
        <>
            <h1>Expense</h1>
            <ExpenseForm expense={expense} />
            <button onClick={history.goBack}>Back</button>
        </>
    );
}
