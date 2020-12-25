import React, { useState } from "react";

import Select from "../elements/select";
import ExpenseRow from "./expense_row";
import useExpenseList from "../hooks/use_expense_list";
import { Controls, Table, TableHeader, TableRow } from "./expense_list.styles";
import { ErrorMessage } from "../styles";

export default function ExpenseList() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const { loading, error, expenses, pagesInfo } = useExpenseList(page, limit);

    const goPreviousPage = () => {
        if (pagesInfo?.prev) {
            setPage(page - 1);
        }
    };
    const goNextPage = () => {
        if (pagesInfo?.next) {
            setPage(page + 1);
        }
    };
    const goToFirstPage = () => {
        if (pagesInfo?.first) {
            setPage(1);
        }
    };
    const goToLastPage = () => {
        if (pagesInfo?.last) {
            const url = new URL(pagesInfo.last.url);
            const page = url.searchParams.get("_page");
            if (page) {
                setPage(parseInt(page));
            }
        }
    };
    const changeLimit = (val: number) => {
        setPage(1);
        setLimit(val);
    };

    return (
        <div>
            <div>
                Page: {page} {loading && <span>Loading...</span>}
            </div>
            {error && (
                <ErrorMessage>
                    -- Failed to retrieve the expenses list --
                </ErrorMessage>
            )}
            <Controls>
                <button onClick={goToFirstPage} disabled={!pagesInfo?.first}>
                    Go to First Page
                </button>
                <button onClick={goPreviousPage} disabled={!pagesInfo?.prev}>
                    Previous
                </button>
                <button onClick={goNextPage} disabled={!pagesInfo?.next}>
                    Next
                </button>
                <button onClick={goToLastPage} disabled={!pagesInfo?.last}>
                    Go to Last Page
                </button>
                <Select
                    selected={limit}
                    values={[50, 100, 200]}
                    onChange={changeLimit}
                />
            </Controls>
            {expenses && (
                <Table>
                    <thead>
                        <TableRow>
                            <TableHeader>Type</TableHeader>
                            <TableHeader>Amount</TableHeader>
                            <TableHeader>Currency</TableHeader>
                            <TableHeader>Recipient</TableHeader>
                            <TableHeader>Date</TableHeader>
                        </TableRow>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <ExpenseRow key={expense.id} expense={expense} />
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
