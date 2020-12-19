import { useEffect, useState } from "react";
import { Expense } from "../types";

export default function useExpense(id?: string) {
    const [loading, setLoading] = useState(false);
    const [expense, setExpense] = useState<Expense>();

    useEffect(() => {
        async function fetchExpense() {
            setLoading(true);

            const response = await fetch(
                `http://localhost:3000/expenses?id=${id}`
            );
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
