import { useEffect, useState } from "react";
import { Expense } from "../types";
import config from "../config.json";

export default function useExpense(id?: string) {
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState<Expense>();

    useEffect(() => {
        async function fetchExpense() {
            setLoading(true);

            const url = new URL(`expenses?id=${id}`, config.serverURL);
            const response = await fetch(url.href);
            const result = (await response.json()) as Expense[];

            setExpense(result[0]);
            setLoading(false);
        }

        if (id) {
            fetchExpense();
        }
    }, [id]);

    return { loading, expense };
}
