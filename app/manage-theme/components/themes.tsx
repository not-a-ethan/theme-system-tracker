import React, { forwardRef, useContext, useState } from "react";

import useSWR from 'swr'

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";

import { EditIcon } from "./icons";
import { DeleteIcon } from "./icons";

import styles from "../../../styles/manageTheme.module.css";

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function Themes(props: any) {
    const { data, error } = useSWR('../api/themes/get', fetcher)
    
    if (!data) {
        return (    
            <Table selectionMode="single" color="success">

                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn className={`${styles.actionsColumn}`}>Actions</TableColumn>
                </TableHeader>

                <TableBody>             
                    <TableRow key={-1}>
                        <TableCell><Skeleton><p></p></Skeleton></TableCell>
                        <TableCell><Skeleton><p></p></Skeleton></TableCell>
                        <TableCell>
                            <Skeleton>
                                <div className={styles.iconsDiv}>
                                    <Button>
                                        <Tooltip content="Edit theme">
                                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                                <EditIcon />
                                            </span>
                                        </Tooltip>
                                    </Button>
                                    
                                    <Button>
                                        <Tooltip color="danger" content="Delete theme">
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                                <DeleteIcon />
                                            </span>
                                        </Tooltip>
                                    </Button>
                                </div>
                            </Skeleton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }
    

    const edit = props.edit;
    const setEdit = props.setEdit;
    const setNewTheme = props.setNewTheme;
    const isOpen = props.isOpen;
    const onOpen = props.onOpen;
    const onOpenChange = props.onOpenChange;
    const themeID = props.themeID;
    const setThemeID = props.setThemeID;

    function notNewTheme() {
        setNewTheme(false);
    }

    function editOpenClick() {
        notNewTheme();
        setEdit(true);
    }

    function deleteOpenClick() {
        notNewTheme();
        setEdit(false);
    }

    function themeClick(e: any) {
        const id = e.target.id;

        setThemeID(id)
    }

    if (data) {
        const arr = data["themes"];

        const final = [];

        for (let i = 0; i < arr.length; i++) {
            final.push([arr[i]["names"], arr[i]["description"], arr[i]["id"]])
        }

        return (
            <>
                <Table selectionMode="single" color="success">

                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Description</TableColumn>
                        <TableColumn className={`${styles.actionsColumn}`}>Actions</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {final.map((theme: string[]) => (
                            <TableRow key={Number(theme[2])} id={theme[2]} onClick={themeClick}>
                                <TableCell id={theme[2]}><p id={theme[2]}>{theme[0]}</p></TableCell>
                                <TableCell id={theme[2]}><p id={theme[2]}>{theme[1]}</p></TableCell>
                                <TableCell id={theme[2]}>
                                    <div className={styles.iconsDiv} id={theme[2]}>
                                        <Button onPressEnd={onOpen} onPress={editOpenClick} onPressStart={themeClick} id={theme[2]}>
                                            <Tooltip content="Edit theme" id={theme[2]}>
                                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" id={theme[2]}>
                                                    <EditIcon />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                        
                                        <Button onPressEnd={onOpen} onPress={deleteOpenClick} onPressStart={themeClick} id={theme[2]}>
                                            <Tooltip color="danger" content="Delete theme" id={theme[2]}>
                                                <span className="text-lg text-danger cursor-pointer active:opacity-50" id={theme[2]}>
                                                    <DeleteIcon />
                                                </span>
                                            </Tooltip>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        )
    }
}