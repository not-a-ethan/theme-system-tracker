'use client';

import React, { useState } from "react";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Skeleton } from "@heroui/skeleton";
import { addToast } from "@heroui/toast";
import { Input } from "@heroui/input";

import Actions from "./actions";

import { getAPI } from "@/helpers/getAPI";

import styles from "../../../styles/manageHabits.module.css";

export default function HabitsTable(props: any) {
    const { habitData, habitError, habitLoading } = getAPI("../api/habits", ["habitData", "habitError", "habitLoading"]);

    const setCreateHabit = props.setCreateHabit;
    const onOpen = props.onOpen;
    const setHabitId = props.setHabitId;

    function editHabit(e: any) {
        const id: number = Number(e.target.id)
        const newVal: string = e.target.value;

        fetch("../api/habits", {
            method: "PUT",
            body: JSON.stringify({
                "id": id,
                "newText": newVal
            })
        })
    }

    if (habitData) {
        const habits = habitData["habits"];

        return (
            <>
                <Table>
                    <TableHeader>
                        <TableColumn>Habit</TableColumn>
                        <TableColumn className={`${styles.actionsColumn}`}>Actions</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {habits.map((habit: any) => (
                            <TableRow key={habit["id"].toString()}>
                                <TableCell>
                                    <Input 
                                        defaultValue={habit["text"]}
                                        type="text"
                                        isRequired
                                        onBlur={editHabit}
                                        id={habit["id"]}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Actions setCreateHabit={setCreateHabit} onOpen={onOpen} setHabitId={setHabitId} thisHabit={habit["id"]} />
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
        <>
            <Table>
                <TableHeader>
                    <TableColumn>Habit</TableColumn>
                    <TableColumn className={`${styles.actionsColumn}`}>Actions</TableColumn>
                </TableHeader>

                <TableBody>
                    <TableRow key={-1}>
                        <TableCell>
                            <Skeleton>Some random habit</Skeleton>
                        </TableCell>
                        <TableCell>
                            <Skeleton>
                                <Actions />
                            </Skeleton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
};