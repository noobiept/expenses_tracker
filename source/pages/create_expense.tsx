import React from "react";
import { useHistory } from "react-router-dom";
import CreateExpenseForm from "../forms/create_expense_form";
import { Buttons } from "./update_expense.styles";

export default function CreateExpense() {
    const history = useHistory();

    return (
        <>
            <h1>Create a new Expense</h1>
            <CreateExpenseForm />
            <Buttons>
                <button onClick={history.goBack}>Back</button>
            </Buttons>
        </>
    );
}
