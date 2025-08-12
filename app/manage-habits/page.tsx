'use client';

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Modal, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";

import HabitsTable from "./components/habits";
import { CreateModal } from "./components/modal/newHabit";
import { DeleteModal } from "./components/modal/deleteHabit";

export default function manageTheme() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [createHabit, setCreateHabit] = useState(true);
    const [habitId, setHabitId] = useState(-1);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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

    function newHabitFunc() {
        setCreateHabit(true);
    }

    return (
        <>
            <h1>Manage habits</h1>

            <p>You can only manage habits attached to your active theme.</p>

            <Button onPress={onOpen} onPressStart={newHabitFunc}>
                Create Habit
            </Button>

            <br />
            <br />

            <HabitsTable setCreateHabit={setCreateHabit} onOpen={onOpen} setHabitId={setHabitId} />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                { createHabit ? <CreateModal /> : <DeleteModal habitId={habitId} />} 
            </Modal>
        </>
    );
};