'use client'

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Skeleton } from "@heroui/skeleton";

import { CreateJournalEntry } from "./components/createJournal";
import { CompleteHabit } from "./components/completeHabit";

import { getAPI } from "@/helpers/getAPI";

export default function DashBoard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { themeData, themeError, themeLoading } = getAPI('../api/themes', ["themeData", "themeError", "themeLoading"]);

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

    if (themeData) {
        const activeTheme = {};

        for (let i = 0; i < themeData["themes"].length; i++) {
            if (themeData["themes"][i]["id"] == themeData["activeTheme"]) {
                activeTheme.id = themeData["themes"][i]["id"];
                activeTheme.name = themeData["themes"][i]["names"];
                activeTheme.description = themeData["themes"][i]["description"];
            }
        }

        return (
            <>
                <h1>Dashboard <p>Current Theme: {activeTheme["name"]}</p></h1>

                <p>{activeTheme["description"]}</p>

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
    }

    return (
        <>
            <h1>
                Dashboard 
                <br />
                Current Theme: <Skeleton>[THIS IS THE THEME]</Skeleton>
            </h1>

            <Skeleton><p>[DESCRIPTION OF THE THEME]</p></Skeleton>

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