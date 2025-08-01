'use client';

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";

import { EditIcon } from "./icons";
import { DeleteIcon } from "./icons";

import styles from "../../styles/manageTheme.module.css"

export default function manageTheme() {
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
            <h1>Manage your themes</h1>
            
            <p>On this page you can choose what is your current themes and modify all your themes</p>

            <Table selectionMode="single" color="success">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Last modified</TableColumn>
                    <TableColumn className={`${styles.actionsColumn}`}>Actions</TableColumn>
                </TableHeader>

                <TableBody>
                    <TableRow key="1">
                        <TableCell>Year of X</TableCell>
                        <TableCell>Jan 1 1970</TableCell>
                        <TableCell>
                            <div className={styles.iconsDiv}>
                                <Tooltip content="Edit theme">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon />
                                    </span>
                                </Tooltip>
                                <Tooltip color="danger" content="Delete theme">
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon />
                                    </span>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Quarter of Y</TableCell>
                        <TableCell>Jan 1 1970</TableCell>
                        <TableCell>
                            <div className={styles.iconsDiv}>
                                <Tooltip content="Edit theme">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <EditIcon />
                                    </span>
                                </Tooltip>
                                <Tooltip color="danger" content="Delete theme">
                                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon />
                                    </span>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}