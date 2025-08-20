'use client';

import React, { useState } from "react"

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { addToast } from "@heroui/toast";

import { getAPI } from "@/helpers/getAPI";

import styles from "../../../styles/dashboard.module.css"
import { Skeleton } from "@heroui/skeleton";

export function CompleteHabit(props: any) {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().length === 1 ? (date.getMonth() + 1).toString().padStart(1, "0"): date.getMonth() + 1}-${date.getDate()}`;

    const { habitData, habitError, habitLoading } = getAPI(`../api/habits?date=${formattedDate}`, ["habitData", "habitError", "habitLoading"]);
    const [habitsDone, setHabitsDone] = useState<string[]>([]);

    function changeHabit(selection: any): void {
        const newSelection: string[] = Array.from(selection);
        let oldSelection: string[] = habitsDone;

        if (oldSelection !== habitData["completed"] && oldSelection.length === 0) {
            oldSelection = habitData["completed"];
        }

        const diffrence: string[] = oldSelection.filter(x => !newSelection.includes(x)).concat(newSelection.filter(x => !oldSelection.includes(x)));
        let adding = true;

        if (newSelection.length < oldSelection.length) {
            adding = false;
        }

        fetch("../api/history/habits", {
            method: "PUT",
            body: JSON.stringify({
                "addHistory": adding,
                "habitId": diffrence[0],
                "date": formattedDate
            })
        }).catch(e => {
            addToast({
                title: "Updated compelted habits failed",
                color: "danger"
            })
        })

        setHabitsDone(newSelection);
    }

    let stuffDone = false;
    let tableRows = <></>;

    if (habitData) {
        const habits = habitData["habits"];

        tableRows = (
            <>
                {habits.map((habit: any) => (
                    <TableRow key={habit["id"].toString()} id={habit["id"]}>
                        <TableCell>
                            {habit["text"]}
                        </TableCell>
                    </TableRow>
                ))}
            </>
        );

        stuffDone = true;
    };

    if (habitError) {
        addToast({
            title: "Failed to fetch habits"
        });
    };

    function setCompeltedHabits() {
        setHabitsDone(habitData["completed"]);
    }

    if (stuffDone) {
        return (
            <span onLoad={() => setCompeltedHabits}>
                <Table selectionMode="multiple" className={`${styles.habitList}`} defaultSelectedKeys={habitData["completed"].join(",").split(",")} onSelectionChange={changeHabit}>
                    <TableHeader>
                        <TableColumn>Habit</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
            </span> 
        )
    }

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