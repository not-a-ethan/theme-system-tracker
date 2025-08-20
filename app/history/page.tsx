'use client'

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Skeleton } from "@heroui/skeleton";
import { DatePicker } from "@heroui/date-picker";
import { today, getLocalTimeZone } from "@internationalized/date";

import { HistoryDate } from "./components/data";

export default function history() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [date, setDate] = useState(today(getLocalTimeZone()));

    if (status === "loading") {
        return (
            <p>Loading...</p>
        );
    };

    if (status === "unauthenticated") {
        router.replace("/api/auth/signin");
        return (
            <p>403 | Login in to see this page</p>
        );
    };

    function updateDate(e: any) {
        let newDate = `${e.year}-${e.month}-${e.day}`.split("-");

        if (newDate[1].length === 1) {
            newDate[1] = `0${newDate[1]}`;
        };

        if (newDate[2].length === 1) {
            newDate[2] = `0${newDate[2]}`;
        };

        newDate = newDate.join("-");

        setDate(newDate);
    }

    return (
        <>
            <h1>History</h1>

            <p>View past days of your theme!</p>

            <DatePicker className="max-w-[284px]" label="Date to look at" showMonthAndYearPickers defaultValue={date} onChange={updateDate} />

            <br />
            
            <HistoryDate date={date} />
        </>
    )
}