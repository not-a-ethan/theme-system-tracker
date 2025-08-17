'use client';

import React, { useState } from "react"

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { addToast } from "@heroui/toast";

import { getAPI } from "@/helpers/getAPI";

import styles from "../../../styles/dashboard.module.css"
import { Skeleton } from "@heroui/skeleton";

export function CompleteHabit(props: any) {
    const { habitData, habitError, habitLoading } = getAPI("../api/habits", ["habitData", "habitError", "habitLoading"]);
    const [habitsDone, setHabitsDone] = useState([]);

    function changeHabit(selection: Set<string>): void {
        const newSelection: string[] = Array.from(selection);
        const oldSelection: string[] = habitsDone;
        const diffrence: string[] = oldSelection.filter(x => !newSelection.includes(x)).concat(newSelection.filter(x => !oldSelection.includes(x)));
        let adding = true;

        if (newSelection < oldSelection) {
            adding = false;
        }

        const date = new Date();

        fetch("../api/history/habits", {
            method: "PUT",
            body: JSON.stringify({
                "addHistory": adding,
                "habitId": diffrence[0],
                "date": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            })
        }).catch(e => {
            addToast({
                title: "Updated compelted habits failed",
                color: "danger"
            })
        })

        setHabitsDone(newSelection);
    }

    if (habitData) {
        const habits = habitData["habits"];

        return (
            <>
                <Table selectionMode="multiple" className={`${styles.habitList}`} onSelectionChange={changeHabit}>
                    <TableHeader>
                        <TableColumn>Habit</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {habits.map((habit: any) => (
                            <TableRow key={habit["id"].toString()} id={habit["id"]}>
                                <TableCell>
                                    {habit["text"]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        );
    };

    if (habitError) {
        addToast({
            title: "Failed to fetch habits"
        });
    };

    return (
        <Table selectionMode="multiple" className={`${styles.habitList}`}>
            <TableHeader>
                <TableColumn>Habit</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>
                        <Skeleton>
                            Accomplished Something?
                        </Skeleton>
                    </TableCell>
                </TableRow>

                <TableRow key="2">
                    <TableCell>
                        <Skeleton>
                            Productive Day?
                        </Skeleton>
                    </TableCell>
                </TableRow>

                <TableRow key="3">
                    <TableCell>
                        <Skeleton>
                            Exercised?
                        </Skeleton>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};