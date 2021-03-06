import React from "react";
import { useHistory, useParams } from "react-router-dom";
import UpdateExpenseForm from "../forms/update_expense_form";
import useExpense from "../hooks/use_expense";
import { ErrorMessage } from "../styles";
import { isEmpty } from "../utilities";
import { Buttons } from "./update_expense.styles";

interface UpdateExpenseParams {
    id?: string;
}

export default function UpdateExpense() {
    const { id } = useParams<UpdateExpenseParams>();
    const { loading, error, expense } = useExpense(id);
    const history = useHistory();

    let content;
    if (loading) {
        content = <div>Loading...</div>;
    } else if (error) {
        content = (
            <ErrorMessage>
                -- Failed to retrieve the expense information --
            </ErrorMessage>
        );
    } else if (!expense || isEmpty(expense)) {
        content = <div>Not found.</div>;
    } else {
        content = <UpdateExpenseForm expense={expense} />;
    }

    return (
        <>
            <h1>Expense</h1>
            {content}
            <Buttons>
                <button onClick={history.goBack}>Back</button>
            </Buttons>
        </>
    );
}
