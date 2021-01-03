import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Expense } from "./types";

dayjs.extend(localizedFormat);

export function formatValue<T>(value?: T) {
    return value ? value : "-";
}

export function formatDate(value?: number) {
    if (!value) {
        return "-";
    }

    return dayjs.unix(value).format("lll");
}

export function isEmpty(dict: Expense) {
    return Object.keys(dict).length === 0;
}

export function validateDate(str?: string) {
    if (!str) {
        return;
    }

    const time = dayjs(str);
    if (time.isValid()) {
        return time.unix();
    }
}

export function validateNumber(str?: string) {
    if (!str) {
        return;
    }

    const value = parseFloat(str);
    if (isNaN(value)) {
        return;
    }

    return value;
}
