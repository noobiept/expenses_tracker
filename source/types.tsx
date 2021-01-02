export interface Expense {
    id: string;
    transactionDate?: number;
    amount?: number;
    recipient?: string;
    currency?: string;
    type?: string;
}

export interface PageInfo {
    _page: string;
    _limit: string;
    rel: "first" | "last" | "next";
    url: string;
}

export interface LinkHeaderInfo {
    first?: PageInfo;
    last?: PageInfo;
    prev?: PageInfo;
    next?: PageInfo;
}

export type SortBy =
    | "id"
    | "transactionDate"
    | "amount"
    | "recipient"
    | "currency"
    | "type";

export type SortOrder = "asc" | "desc";
