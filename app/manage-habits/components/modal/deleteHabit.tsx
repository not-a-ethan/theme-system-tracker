import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

export function DeleteModal(props: any) {
    const habitId = props["habitId"];

    function deleteHabit() {

        fetch("../api/habits", {
            method: "DELETE",
            body: JSON.stringify({
                "id": habitId,
            })
        }).catch(e => {
            addToast({
                title: "Failed to delete habit",
                description: e,
                color: "danger"
            })
        })
    }

    return (
        <>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Are you sure you want to delete this habit? All attached data (including history) will be deleted
                </ModalHeader>

                <ModalBody>
                   <Button color="danger" onPress={deleteHabit}>
                    Delete habit
                    </Button>
                </ModalBody>
            </ModalContent>
        </>
    )
}