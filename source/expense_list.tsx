import React, { useState } from "react";
import { Link } from "react-router-dom";

import Select from "./elements/select";
import useExpenseList from "./hooks/use_expense_list";

export default function ExpenseList() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const { loading, expenses, pagesInfo } = useExpenseList(page, limit);

    if (loading) {
        return <div>Loading...</div>;
    }

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
            <div>Page: {page}</div>
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
            {expenses && (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            <Link to={`/expense/${expense.id}`}>
                                {expense.transactionDate} {expense.type}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
