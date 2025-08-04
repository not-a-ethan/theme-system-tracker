'use client';

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Modal, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";

import { Themes } from "./components/themes";
import { EditModal } from "./components/editModal";
import { DeleteModal } from "./components/deleteModal";
import { NewThemeModal } from "./components/newThemeModal";

import { EditIcon } from "./components/icons";
import { DeleteIcon } from "./components/icons";

import styles from "../../styles/manageTheme.module.css"

export default function manageTheme() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [themeID, setThemeID] = useState(-1);
    /*
    Need to add logic when edit/delete button is pressed, the themeID gets updated
    */
   const [edit, setEdit] = useState(true);
   const [newTheme, setNewTheme] = useState(false);

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

    function newThemeFunc() {
        setNewTheme(true);
    }

    return (
        <>
            <h1>Manage your themes</h1>
            
            <p>On this page you can choose what is your current themes and modify all your themes</p>

            <br />

            <Button onPress={onOpen} onPressStart={newThemeFunc}>
                Add Theme
            </Button>

            <br />
            <br />    

            <Themes edit={edit} setEdit={setEdit} setNewTheme={setNewTheme} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />

            <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
                {newTheme ? <NewThemeModal /> : (edit ? <EditModal themeID={themeID} /> : <DeleteModal themeID={themeID} />)}
            </Modal>
        </>
    )
}