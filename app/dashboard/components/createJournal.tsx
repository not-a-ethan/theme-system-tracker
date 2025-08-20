'use client';

import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

import { getLocalTimeZone, today } from "@internationalized/date";

import styles from "../../../styles/dashboard.module.css"

export function CreateJournalEntry(props: any) {
    
    const now = today(getLocalTimeZone());

    function createEntry() {
        const metaData = (document.getElementById("metaData") as HTMLInputElement).value;
        const fieldOne = (document.getElementById("fieldOne") as HTMLInputElement).value;
        const fieldTwo = (document.getElementById("fieldTwo") as HTMLInputElement).value;
        const fieldThree = (document.getElementById("fieldThree") as HTMLInputElement).value;
        const fieldFour = (document.getElementById("fieldFour") as HTMLInputElement).value;

        fetch("../api/journal", {
            method: "POST",
            body: JSON.stringify({
                "fieldOne": fieldOne,
                "fieldTwo": fieldTwo,
                "fieldThree": fieldThree,
                "fieldFour": fieldFour,
                "metaData": metaData
            })
        })
    }

    return (
        <Form>
            <h2>Theme Journal Entry</h2>

            <div className={`${styles.metaDataItems}`}>
                <Input type="text" label="Meta-data (ex: location)" className={`${styles.metaDataInput}`} id="metaData" />
            </div>
            
            <Textarea isRequired label="Field 1" minRows={3} id="fieldOne" />
            <Textarea isRequired label="Field 2" minRows={3} id="fieldTwo" />

            <Textarea isRequired label="Field 3" minRows={6} id="fieldThree" />

            <Textarea isRequired label="Field 4" minRows={3} id="fieldFour" />

            <Button onPress={createEntry}>Enter</Button>
        </Form>
    );
}