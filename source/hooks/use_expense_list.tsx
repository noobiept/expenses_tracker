import { useEffect, useState } from "react";
import ParseLinkHeader from "parse-link-header";
import { Expense, LinkHeaderInfo } from "../types";
import config from "../config.json";
import { logError } from "../log";
import { getExpenseList } from "../requests";

export default function useExpenseList(page: number, limit: number) {
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
                    limit
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
    }, [page, limit]);

    return { loading, error, expenses, pagesInfo };
}
