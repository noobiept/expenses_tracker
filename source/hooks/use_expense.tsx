import { useEffect, useState } from "react";
import { Expense } from "../types";
import { getExpense } from "../requests";
import { logError } from "../log";

export default function useExpense(id?: string) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [expense, setExpense] = useState<Expense>();

    useEffect(() => {
        async function fetchExpense() {
            setLoading(true);
            setError(false);

            try {
                setExpense(await getExpense(id));
            } catch (err) {
                setError(true);
                logError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchExpense();
        }
    }, [id]);

    return { loading, error, expense };
}
