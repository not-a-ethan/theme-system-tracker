import React, { useEffect, useState } from "react";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { addToast } from "@heroui/toast";

import { EditIcon } from "../../../helpers/icons";
import { DeleteIcon } from "../../../helpers/icons";

import { getAPI } from "@/helpers/getAPI";

import styles from "../../../styles/manageTheme.module.css";

export function Themes(props: any) {
    const { themeData, themeError, themeLoading } = getAPI('../api/themes', ["themeData", "themeError", "themeLoading"]);

    if (themeError) {
        addToast({
            title: "Failed to fetch themes",
            color: "danger"
        });
    };

    if (!themeData) {
        return (    
            <Table selectionMode="single" color="success">

                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Description</TableColumn>
                    <TableColumn className={`${styles.actionsColumn}`}>Actions</TableColumn>
                </TableHeader>

                <TableBody>             
                    <TableRow key={-1}>
                        <TableCell><Skeleton><p>Some theme name</p></Skeleton></TableCell>
                        <TableCell><Skeleton><p>Some theme description</p></Skeleton></TableCell>
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
        );
    };
    
    const setEdit = props.setEdit;
    const onOpen = props.onOpen;
    const themeID = props.themeID;
    const setThemeID = props.setThemeID;

    function editOpenClick() {
        setEdit(true);
    };

    function deleteOpenClick() {
        setEdit(false);
    };

    function themeClick(e: any) {
        const id = e.target.id;

        setThemeID(id);

        fetch("../api/account/themes", {
            method: "PUT",
            body: JSON.stringify({
                "themeID": id
            })
        })
        .catch(e => addToast({
                title: "Failed to set active theme",
                color: "danger"
            })
        );
    }

    let stuffDone = false;
    let tableRows = <></>;

    if (themeData) {
        const arr = themeData["themes"];
        const final = [];

        for (let i = 0; i < arr.length; i++) {
            final.push([arr[i]["names"], arr[i]["description"], arr[i]["id"]])
        }

        tableRows = <>
            {final.map((theme: string[]) => (
                <TableRow key={theme[2].toString()} id={theme[2]} onClick={themeClick}>
                    <TableCell id={theme[2]}><p id={theme[2]}>{theme[0]}</p></TableCell>
                    <TableCell id={theme[2]}><p id={theme[2]}>{theme[1]}</p></TableCell>
                    <TableCell id={theme[2]}>
                        <div className={styles.iconsDiv} id={theme[2]}>
                            <Button onPressEnd={() => onOpen} onPress={() => editOpenClick} onPressStart={() => themeClick} id={theme[2]}>
                                <Tooltip content="Edit theme" id={theme[2]}>
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50" id={theme[2]}>
                                        <EditIcon />
                                    </span>
                                </Tooltip>
                            </Button>
                            
                            <Button onPressEnd={() => onOpen} onPress={() => deleteOpenClick} onPressStart={() => themeClick} id={theme[2]}>
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
        </>

        stuffDone = true;
    }

    function setApiThemeId() {
        setThemeID(themeData["activeTheme"]);
    }

    if (stuffDone) {
        return (
            <span onLoad={setApiThemeId}>
                <Table selectionMode="single" color="success" disallowEmptySelection defaultSelectedKeys={themeID.toString() ? themeID.toString() : themeData["activeTheme"]} >

                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Description</TableColumn>
                        <TableColumn className={`${styles.actionsColumn}`}>Actions</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
            </span>
        )
    }
}