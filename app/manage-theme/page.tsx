'use client';

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { Modal, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";

import { EditModal } from "./editModal";
import { DeleteModal } from "./deleteModal";

import { EditIcon } from "./icons";
import { DeleteIcon } from "./icons";

import styles from "../../styles/manageTheme.module.css"

export default function manageTheme() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [themeID, setThemeID] = useState(-1);
    /*
    Need to add logic when edit/delete button is pressed, the themeID gets updated
    */
   const [edit, setEdit] = useState(true);

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

    function editOpenClick() {
        setEdit(true);
    }

    function deleteOpenClick() {
        setEdit(false);
    }

    return (
        <>
            <h1>Manage your themes</h1>
            
            <p>On this page you can choose what is your current themes and modify all your themes</p>

            <Table selectionMode="single" color="success">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn className={`${styles.actionsColumn}`}>Actions</TableColumn>
                </TableHeader>

                <TableBody>
                    <TableRow key="1">
                        <TableCell>Year of X</TableCell>
                        <TableCell>Sit minim ipsum culpa labore ullamco ad eu quis Lorem. Occaecat minim eiusmod aute fugiat nulla ea anim excepteur mollit. </TableCell>
                        <TableCell>
                            <div className={styles.iconsDiv}>
                                <Button onPress={onOpen} onPressStart={editOpenClick}>
                                    <Tooltip content="Edit theme">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <EditIcon />
                                        </span>
                                    </Tooltip>
                                </Button>
                                
                                <Button onPress={onOpen} onPressStart={deleteOpenClick}>
                                    <Tooltip color="danger" content="Delete theme">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
                {edit ? <EditModal themeID={themeID} /> : <DeleteModal themeID={themeID} />}
            </Modal>
        </>
    )
}