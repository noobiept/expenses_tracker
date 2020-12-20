import { useEffect, useState } from "react";
import ParseLinkHeader from "parse-link-header";
import { Expense, LinkHeaderInfo } from "../types";

export default function useExpenseList(page: number, limit: number) {
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState<Expense[] | undefined>();
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

    return { loading, expenses, pagesInfo };
}
