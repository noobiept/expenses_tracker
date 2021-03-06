import ParseLinkHeader from "parse-link-header";
import config from "./config.json";
import { Expense, LinkHeaderInfo, SortBy, SortOrder } from "./types";

export async function getExpenseList(
    page: number,
    limit: number,
    sort: SortBy,
    order: SortOrder
) {
    const url = new URL(
        `expenses?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
        config.serverURL
    );
    const response = await fetch(url.href);
    if (!response.ok) {
        throw new Error(`Unsuccessful response: ${response.status}`);
    }

    const linkHeader = response.headers.get("link");
    if (!linkHeader) {
        throw new Error("Missing 'link' header.");
    }

    const parsedPagesInfo = ParseLinkHeader(linkHeader) as
        | LinkHeaderInfo
        | undefined;
    if (!parsedPagesInfo) {
        throw new Error("Failed to parse the 'link' info.");
    }

    const result = (await response.json()) as Expense[];

    return { result, parsedPagesInfo };
}

export async function getExpense(id?: string) {
    if (!id) {
        throw new Error("Missing ID.");
    }

    const url = new URL(`expenses/${id}`, config.serverURL);
    const response = await fetch(url.href);
    if (!response.ok) {
        throw new Error(`Unsuccessful response: ${response.status}`);
    }

    const result = (await response.json()) as Expense;

    return result;
}

export async function deleteExpense(id?: string) {
    if (!id) {
        throw new Error("Missing ID.");
    }

    const url = new URL(`expenses/${id}`, config.serverURL);
    const response = await fetch(url.href, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Unsuccessful response: ${response.status}`);
    }

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
    if (!response.ok) {
        throw new Error(`Unsuccessful response: ${response.status}`);
    }

    return response.ok;
}

export async function createExpense(expense: Expense) {
    const url = new URL(`expenses`, config.serverURL);
    const response = await fetch(url.href, {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(expense),
    });
    if (!response.ok) {
        throw new Error(`Unsuccessful response: ${response.status}`);
    }

    return response.ok;
}
