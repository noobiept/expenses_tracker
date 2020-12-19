import React, { useEffect, useState } from "react";
import ParseLinkHeader from "parse-link-header";

import { Expense, LinkHeaderInfo } from "./types";
import Select from "./elements/select";

export default function ExpensesList() {
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState<Expense[] | undefined>();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [pagesInfo, setPagesInfo] = useState<LinkHeaderInfo>();

    useEffect(() => {
        async function fetchExpenses() {
            const response = await fetch(
                `http://localhost:3000/expenses?_page=${page}&_limit=${limit}`
            );
            const linkHeader = response.headers.get("link");

            if (!linkHeader) {
                console.error("Missing 'link' header.");
                return;
            }

            const parsedPagesInfo = ParseLinkHeader(linkHeader);
            if (!parsedPagesInfo) {
                console.error("Failed to parse the 'link' info.");
                return;
            }

            const result = (await response.json()) as Expense[];
            setExpenses(result);
            setLoading(false);
            setPagesInfo((parsedPagesInfo as unknown) as LinkHeaderInfo);
        }

        fetchExpenses();
    }, [page, limit]);

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
            <Select values={[50, 100, 200]} onChange={changeLimit} />
            {expenses && (
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id}>{expense.transactionDate}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
