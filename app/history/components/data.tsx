import { Skeleton } from "@heroui/skeleton";

import { getAPI } from "@/helpers/getAPI";

export function HistoryDate(props: any) {
    const date = props.date;

    const { habitData, habitError, habitLoading } = getAPI(`../api/habits?date=${date}`, ["habitData", "habitError", "habitLoading"]);
    const { journalData, journalError, journalLoading } = getAPI(`../api/history/journal?date=${date}`, ["journalData", "journalError", "journalLoading"]);

    return (
        <>
            <p>Hello World</p>
        </>
    );
};