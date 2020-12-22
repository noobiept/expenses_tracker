import config from "./config.json";
import { Expense } from "./types";

export async function getExpense(id?: string) {
    if (!id) {
        return;
    }

    const url = new URL(`expenses/${id}`, config.serverURL);
    const response = await fetch(url.href);
    const result = (await response.json()) as Expense;

    return result;
}

export async function deleteExpense(id?: string) {
    if (!id) {
        return false;
    }

    const url = new URL(`expenses/${id}`, config.serverURL);
    const response = await fetch(url.href, {
        method: "DELETE",
    });
    return response.ok;
}

export async function updateExpense(expense: Expense) {
    const url = new URL(`expenses/${expense.id}`, config.serverURL);
    const response = await fetch(url.href, {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(expense),
    });
    return response.ok;
}
