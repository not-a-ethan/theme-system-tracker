import { Skeleton } from "@heroui/skeleton";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";

import { getAPI } from "@/helpers/getAPI";

import styles from "../../../styles/history.module.css"

export function HistoryDate(props: any) {
    const date = props.date;

    const { habitData, habitError, habitLoading } = getAPI(`../api/habits?date=${date}`, ["habitData", "habitError", "habitLoading"]);
    const { journalData, journalError, journalLoading } = getAPI(`../api/history/journal?date=${date}`, ["journalData", "journalError", "journalLoading"]);

    if (habitData && journalData) {
        const completedHabits = [];

        for (let i = 0; i < habitData["completed"].length; i++) {
            const id = habitData["completed"][i];

            for (let j = 0; j < habitData["habits"].length; j++) {
                if (habitData["habits"][j].id == id) {
                    completedHabits.push(habitData["habits"][j])
                }
            }
        };

        const journalDataObj = journalData["data"];

        if (journalDataObj) {
            const date = new Date(journalDataObj["dateTime"] * 1000);

            if (journalDataObj.length === 0) {
                return (
                    <>
                        <div className={styles.container}>
                            <div className={`${styles.displayFlex} ${styles.left}`}>
                                <p>No Journal entry this day</p>

                                <div className={`${styles.metaDataItems}`}>
                                    <Input type="text" label="Meta-data (ex: location)" className={`${styles.metaDataInput}`} id="metaData" isDisabled />
                                </div>
                                
                                <Textarea label="Field 1" minRows={3} id="fieldOne" isDisabled className={styles.textArea} />
                                <Textarea label="Field 2" minRows={3} id="fieldTwo" isDisabled className={styles.textArea} />

                                <Textarea label="Field 3" minRows={6} id="fieldThree" isDisabled className={styles.textArea} />

                                <Textarea label="Field 4" minRows={3} id="fieldFour" isDisabled className={styles.textArea} />
                            </div>

                            <div className={styles.right}>
                                <Table>
                                    <TableHeader>
                                        <TableColumn>Habit</TableColumn>
                                    </TableHeader>

                                    <TableBody>
                                        {completedHabits.map((habit: any) => (
                                            <TableRow key={habit["id"]}>
                                                <TableCell>
                                                    {habit["text"]}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </>
                );
            }

            return (
                <>
                    <div className={styles.container}>
                        <div className={`${styles.displayFlex} ${styles.left}`}>
                            <p>{date.toDateString()} at {date.getHours()}:{date.getMinutes()}</p>

                            <div className={`${styles.metaDataItems}`}>
                                <Input type="text" label="Meta-data (ex: location)" className={`${styles.metaDataInput}`} id="metaData" isDisabled defaultValue={journalDataObj["metaData"]} />
                            </div>
                            
                            <Textarea label="Field 1" minRows={3} id="fieldOne" isDisabled defaultValue={journalDataObj["fieldOne"]} className={styles.textArea} />
                            <Textarea label="Field 2" minRows={3} id="fieldTwo" isDisabled defaultValue={journalDataObj["fieldTwo"]} className={styles.textArea} />

                            <Textarea label="Field 3" minRows={6} id="fieldThree" isDisabled defaultValue={journalDataObj["fieldThree"]} className={styles.textArea} />

                            <Textarea label="Field 4" minRows={3} id="fieldFour" isDisabled defaultValue={journalDataObj["filedFour"]} className={styles.textArea} />
                        </div>

                        <div className={styles.right}>
                            <Table>
                                <TableHeader>
                                    <TableColumn>Habit</TableColumn>
                                </TableHeader>

                                <TableBody>
                                    {completedHabits.map((habit: any) => (
                                        <TableRow key={habit["id"]}>
                                            <TableCell>
                                                {habit["text"]}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </>
            )
        }
    }

    if (habitData) {
        const completedHabits = [];

        for (let i = 0; i < habitData["completed"].length; i++) {
            const id = habitData["completed"][i];

            for (let j = 0; j < habitData["habits"].length; j++) {
                if (habitData["habits"][j].id == id) {
                    completedHabits.push(habitData["habits"][j])
                }
            }
        };

        return (
            <>
                <div className={styles.container}>
                    <div className={`${styles.displayFlex} ${styles.left}`}>
                        <div className={`${styles.metaDataItems}`}>
                            <Skeleton><Input type="text" label="Meta-data (ex: location)" className={`${styles.metaDataInput}`} id="metaData" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} /></Skeleton>
                        </div>
                        
                        <Skeleton><Textarea label="Field 1" minRows={3} id="fieldOne" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} className={styles.textArea} /></Skeleton>
                        <Skeleton><Textarea label="Field 2" minRows={3} id="fieldTwo" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} className={styles.textArea} /></Skeleton>

                        <Skeleton><Textarea label="Field 3" minRows={6} id="fieldThree" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} className={styles.textArea} /></Skeleton>

                        <Skeleton><Textarea label="Field 4" minRows={3} id="fieldFour" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} className={styles.textArea} /></Skeleton>
                    </div>

                    <div className={styles.right}>
                        <Table>
                            <TableHeader>
                                <TableColumn>Habit</TableColumn>
                            </TableHeader>

                            <TableBody>
                                {completedHabits.map((habit: any) => (
                                    <TableRow key={habit["id"]}>
                                        <TableCell>
                                            {habit["text"]}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </>
        );
    };

    if (journalData) {
        const journalDataObj = journalData["data"];

        if (journalDataObj.length === 0) {
            return (
                <>
                    <div className={styles.container}>
                        <div className={`${styles.displayFlex} ${styles.left}`}>
                            <p>No Journal entry this day</p>

                            <div className={`${styles.metaDataItems}`}>
                                <Input type="text" label="Meta-data (ex: location)" className={`${styles.metaDataInput}`} id="metaData" isDisabled />
                            </div>
                            
                            <Textarea label="Field 1" minRows={3} id="fieldOne" isDisabled className={styles.textArea} />
                            <Textarea label="Field 2" minRows={3} id="fieldTwo" isDisabled className={styles.textArea} />

                            <Textarea label="Field 3" minRows={6} id="fieldThree" isDisabled className={styles.textArea} />

                            <Textarea label="Field 4" minRows={3} id="fieldFour" isDisabled className={styles.textArea} />
                        </div>

                        <div className={styles.right}>
                            <Table>
                                <TableHeader>
                                    <TableColumn>Habit</TableColumn>
                                </TableHeader>

                                <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Skeleton>Shh its a secret</Skeleton>
                                            </TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className={styles.container}>
                    <div className={`${styles.displayFlex} ${styles.left}`}>
                        <p>{date.toDateString()} at {date.getHours()}:{date.getMinutes()}</p>

                        <div className={`${styles.metaDataItems}`}>
                            <Input type="text" label="Meta-data (ex: location)" className={`${styles.metaDataInput}`} id="metaData" isDisabled defaultValue={journalDataObj["metaData"]} />
                        </div>
                        
                        <Textarea label="Field 1" minRows={3} id="fieldOne" isDisabled defaultValue={journalDataObj["fieldOne"]} className={styles.textArea} />
                        <Textarea label="Field 2" minRows={3} id="fieldTwo" isDisabled defaultValue={journalDataObj["fieldTwo"]} className={styles.textArea} />

                        <Textarea label="Field 3" minRows={6} id="fieldThree" isDisabled defaultValue={journalDataObj["fieldThree"]} className={styles.textArea} />

                        <Textarea label="Field 4" minRows={3} id="fieldFour" isDisabled defaultValue={journalDataObj["filedFour"]} className={styles.textArea} />
                    </div>

                    <div className={styles.right}>
                        <Table>
                            <TableHeader>
                                <TableColumn>Habit</TableColumn>
                            </TableHeader>

                            <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Skeleton>Shh its a secret</Skeleton>
                                        </TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className={styles.container}>
                <div className={`${styles.displayFlex} ${styles.left}`}>
                    <div className={`${styles.metaDataItems}`}>
                        <Skeleton><Input type="text" label="Meta-data (ex: location)" className={`${styles.metaDataInput}`} id="metaData" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} /></Skeleton>
                    </div>
                    
                    <Skeleton><Textarea label="Field 1" minRows={3} id="fieldOne" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} className={styles.textArea} /></Skeleton>
                    <Skeleton><Textarea label="Field 2" minRows={3} id="fieldTwo" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} className={styles.textArea} /></Skeleton>

                    <Skeleton><Textarea label="Field 3" minRows={6} id="fieldThree" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} className={styles.textArea} /></Skeleton>

                    <Skeleton><Textarea label="Field 4" minRows={3} id="fieldFour" isDisabled defaultValue={`<Skeleton>Shh its a secret</Skeleton>`} className={styles.textArea} /></Skeleton>
                </div>

                <div className={styles.right}>
                    <Table>
                        <TableHeader>
                            <TableColumn>Habit</TableColumn>
                        </TableHeader>

                        <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Skeleton>Shh its a secret</Skeleton>
                                    </TableCell>
                                </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};