import { useEffect, useState } from "react";
import { Expense, LinkHeaderInfo, SortBy, SortOrder } from "../types";
import { logError } from "../log";
import { getExpenseList } from "../requests";

export default function useExpenseList(
    page: number,
    limit: number,
    sort: SortBy,
    order: SortOrder
) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [expenses, setExpenses] = useState<Expense[] | undefined>();
    const [pagesInfo, setPagesInfo] = useState<LinkHeaderInfo>();

    useEffect(() => {
        async function fetchExpenses() {
            setLoading(true);
            setError(false);

            try {
                const { result, parsedPagesInfo } = await getExpenseList(
                    page,
                    limit,
                    sort,
                    order
                );
                setExpenses(result);
                setPagesInfo(parsedPagesInfo);
            } catch (err) {
                setError(true);
                logError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchExpenses();
    }, [page, limit, sort, order]);

    return { loading, error, expenses, pagesInfo };
}
