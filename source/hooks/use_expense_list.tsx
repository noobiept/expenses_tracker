import { useEffect, useState } from "react";
import ParseLinkHeader from "parse-link-header";
import { Expense, LinkHeaderInfo } from "../types";
import config from "../config.json";

export default function useExpenseList(page: number, limit: number) {
    const [loading, setLoading] = useState(false);
    const [expenses, setExpenses] = useState<Expense[] | undefined>();
    const [pagesInfo, setPagesInfo] = useState<LinkHeaderInfo>();

    useEffect(() => {
        async function fetchExpenses() {
            setLoading(true);

            const url = new URL(
                `expenses?_page=${page}&_limit=${limit}`,
                config.serverURL
            );
            const response = await fetch(url.href);
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

    return { loading, expenses, pagesInfo };
}
