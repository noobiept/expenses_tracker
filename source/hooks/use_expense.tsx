import { useEffect, useState } from "react";
import { Expense } from "../types";
import { getExpense } from "../requests";

export default function useExpense(id?: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [expense, setExpense] = useState<Expense>();

    useEffect(() => {
        async function fetchExpense() {
            setLoading(true);
            setError(false);

            try {
                setExpense(await getExpense(id));
            } catch {
                setError(true);
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
