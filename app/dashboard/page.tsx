'use client';

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { DatePicker } from "@heroui/date-picker";

import {getLocalTimeZone, today} from "@internationalized/date";

import styles from "../../styles/dashboard.module.css"

export default function DashBoard() {
    const { data: session, status } = useSession();
    const router = useRouter();

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

    let now = today(getLocalTimeZone());

    return (
        <>
            <h1>Dashboard <p>Current Theme: [THIS IS THE THEME]</p></h1>

            <p>[DESCRIPTION OF THE THEME]</p>

            <br />

            <div>
                <Accordion defaultExpandedKeys={["1"]}>
                    <AccordionItem key="1" aria-label="Habits" title="Habits">
                        <Table selectionMode="multiple" className={`${styles.habitList}`}>
                        <TableHeader>
                            <TableColumn>Habit</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>Accomplished Something?</TableCell>
                            </TableRow>

                            <TableRow key="2">
                                <TableCell>Productive Day?</TableCell>
                            </TableRow>

                            <TableRow key="3">
                                <TableCell>Exercised?</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </AccordionItem>

                    <AccordionItem key="2" aria-label="Journal Entry" title="Journal Entry">
                        <Form className={`${styles.newEntry}`}>
                            <h2>Theme Journal Entry</h2>

                            <div className={`${styles.metaDataItems}`}>
                                <DatePicker label="Jornal Date" isRequired defaultValue={now} />

                                <Input type="text" label="Meta-data (ex: location)" className={`${styles.metaDataInput}`} />
                            </div>
                            
                            <Textarea isRequired label="Field 1" minRows={3} />
                            <Textarea isRequired label="Field 2" minRows={3} />

                            <Textarea isRequired label="Field 3" minRows={6} />

                            <Textarea isRequired label="Field 4" minRows={3} />

                            <Button>Enter</Button>
                        </Form>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};