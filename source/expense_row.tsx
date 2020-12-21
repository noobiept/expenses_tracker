import React from "react";
import { Link } from "react-router-dom";
import { Expense } from "./types";
import { formatDate } from "./utilities";

export interface ExpenseRowArgs {
    expense: Expense;
}

export default function ExpenseRow({ expense }: ExpenseRowArgs) {
    return (
        <div>
            <Link to={`/expense/${expense.id}`}>
                {formatDate(expense.transactionDate)}
                {expense.type}
            </Link>
        </div>
    );
}
