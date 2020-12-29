import React from "react";
import { useHistory } from "react-router-dom";

import { Expense } from "../types";
import { formatDate, formatValue } from "../utilities";
import { TableData, TableRow } from "./expense_row.styles";

export interface ExpenseRowArgs {
    expense: Expense;
}

export default function ExpenseRow({ expense }: ExpenseRowArgs) {
    const history = useHistory();
    const rowClick = () => history.push(`/expense/${expense.id}`);

    return (
        <TableRow onClick={rowClick}>
            <TableData>{formatValue(expense.type)}</TableData>
            <TableData>{formatValue(expense.amount)}</TableData>
            <TableData>{formatValue(expense.currency)}</TableData>
            <TableData>{formatValue(expense.recipient)}</TableData>
            <TableData>{formatDate(expense.transactionDate)}</TableData>
        </TableRow>
    );
}
