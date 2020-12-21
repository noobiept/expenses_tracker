import { useEffect, useState } from "react";
import { Expense } from "../types";
import { getExpense } from "../requests";

export default function useExpense(id?: string) {
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState<Expense>();

    useEffect(() => {
        async function fetchExpense() {
            setLoading(true);
            setExpense(await getExpense(id));
            setLoading(false);
        }

        if (id) {
            fetchExpense();
        }
    }, [id]);

    return { loading, expense };
}
