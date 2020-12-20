import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export function formatDate(value: string) {
    return dayjs(value).format("lll");
}

export function formatDateLong(value: string) {
    return dayjs(value).format("LLLL");
}
