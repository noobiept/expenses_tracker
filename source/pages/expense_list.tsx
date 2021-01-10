import React, { useState } from "react";

import Select from "../elements/select";
import ExpenseRow from "./expense_row";
import useExpenseList from "../hooks/use_expense_list";
import {
    Controls,
    Table,
    TableHeader,
    TableRow,
    TBody,
    THead,
} from "./expense_list.styles";
import { ErrorMessage } from "../styles";
import { SortBy, SortOrder } from "../types";
import Notification from "../elements/notification_popup";

export default function ExpenseList() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [sortBy, setSortBy] = useState<SortBy>("type");
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const { loading, error, expenses, pagesInfo } = useExpenseList(
        page,
        limit,
        sortBy,
        sortOrder
    );

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
    const sortTable = (sortKey: SortBy) => {
        return () => {
            if (sortBy === sortKey) {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
                setSortBy(sortKey);
                setSortOrder("asc");
            }
        };
    };

    return (
        <div>
            <Notification />
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
                    <THead>
                        <TableRow>
                            <TableHeader
                                selected={sortBy === "type"}
                                onClick={sortTable("type")}
                            >
                                Type
                            </TableHeader>
                            <TableHeader
                                selected={sortBy === "amount"}
                                onClick={sortTable("amount")}
                            >
                                Amount
                            </TableHeader>
                            <TableHeader
                                selected={sortBy === "currency"}
                                onClick={sortTable("currency")}
                            >
                                Currency
                            </TableHeader>
                            <TableHeader
                                selected={sortBy === "recipient"}
                                onClick={sortTable("recipient")}
                            >
                                Recipient
                            </TableHeader>
                            <TableHeader
                                selected={sortBy === "transactionDate"}
                                onClick={sortTable("transactionDate")}
                            >
                                Date
                            </TableHeader>
                        </TableRow>
                    </THead>
                    <TBody>
                        {expenses.map((expense) => (
                            <ExpenseRow key={expense.id} expense={expense} />
                        ))}
                    </TBody>
                </Table>
            )}
        </div>
    );
}
