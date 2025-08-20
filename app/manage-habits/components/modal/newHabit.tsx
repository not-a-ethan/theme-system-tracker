import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";

export function CreateModal(props: any) {
    function createHabit() {
        const name = (document.getElementById("habitName") as HTMLInputElement).value;

        if (!name) {
            addToast({
                title: "Failed to create new habit",
                description: "Habits need to have a text",
                color: "danger"
            })
        }

        fetch("../api/habits", {
            method: "POST",
            body: JSON.stringify({
                "text": name
            })
        })
        .catch(e => {
            addToast({
                title: "Failed to create new habit",
                description: "Something went wrong",
                color: "danger"
            });
        });
    };

    return (
        <>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Create Habit
                </ModalHeader>

                <ModalBody>
                    <Input
                        label="Name"
                        placeholder="Enter the name for the habit"
                        variant="bordered"
                        id="habitName"
                    />

                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onPress={createHabit}>
                    Create habit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </>
    )
}