import React from "react";
import { useHistory } from "react-router-dom";

import { Expense } from "../types";
import { formatDate } from "../utilities";
import { TableData, TableRow } from "./expense_row.styles";

export interface ExpenseRowArgs {
    expense: Expense;
}

export default function ExpenseRow({ expense }: ExpenseRowArgs) {
    const history = useHistory();
    const rowClick = () => history.push(`/expense/${expense.id}`);

    return (
        <TableRow onClick={rowClick}>
            <TableData>{expense.type}</TableData>
            <TableData>{expense.amount}</TableData>
            <TableData>{expense.currency}</TableData>
            <TableData>{expense.recipient}</TableData>
            <TableData>{formatDate(expense.transactionDate)}</TableData>
        </TableRow>
    );
}
