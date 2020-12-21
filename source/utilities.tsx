import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Expense } from "./types";

dayjs.extend(localizedFormat);

export function formatDate(value: string) {
    return dayjs(value).format("lll");
}

export function formatDateLong(value: string) {
    return dayjs(value).format("LLLL");
}

export function isEmpty(dict: Expense) {
    return Object.keys(dict).length === 0;
}
