'use client'

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Accordion, AccordionItem } from "@heroui/accordion";

import { CreateJournalEntry } from "./components/createJournal";
import { CompleteHabit } from "./components/completeHabit";

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

    return (
        <>
            <h1>Dashboard <p>Current Theme: [THIS IS THE THEME]</p></h1>

            <p>[DESCRIPTION OF THE THEME]</p>

            <br />

            <div>
                <Accordion defaultExpandedKeys={["1"]}>
                    <AccordionItem key="1" aria-label="Habits" title="Habits">
                        <CompleteHabit />
                    </AccordionItem>

                    <AccordionItem key="2" aria-label="Journal Entry" title="Journal Entry">
                        <CreateJournalEntry />
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};