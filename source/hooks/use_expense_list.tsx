import { useEffect, useState } from "react";
import ParseLinkHeader from "parse-link-header";
import { Expense, LinkHeaderInfo } from "../types";
import config from "../config.json";
import { logError } from "../log";

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
                const url = new URL(
                    `expenses?_page=${page}&_limit=${limit}`,
                    config.serverURL
                );
                const response = await fetch(url.href);
                if (!response.ok) {
                    throw new Error(
                        `Unsuccessful response: ${response.status}`
                    );
                }

                const linkHeader = response.headers.get("link");
                if (!linkHeader) {
                    throw new Error("Missing 'link' header.");
                }

                const parsedPagesInfo = ParseLinkHeader(linkHeader);
                if (!parsedPagesInfo) {
                    throw new Error("Failed to parse the 'link' info.");
                }

                const result = (await response.json()) as Expense[];
                setExpenses(result);
                setPagesInfo((parsedPagesInfo as unknown) as LinkHeaderInfo);
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
