import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Expense } from "./types";

dayjs.extend(localizedFormat);

export function formatValue<T>(value?: T) {
    return value ? value : "-";
}

export function formatDate(value?: string) {
    if (!value) {
        return "-";
    }

    return dayjs(value).format("lll");
}

export function formatDateLong(value: string) {
    return dayjs(value).format("LLLL");
}

export function isEmpty(dict: Expense) {
    return Object.keys(dict).length === 0;
}
