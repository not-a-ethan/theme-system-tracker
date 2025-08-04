import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";

export function DeleteModal(props: any) {
    const themeID = props.themeID;

    function deleteClick() {
        fetch("../api/themes/delete", {
            method: "DELETE",
            body: JSON.stringify({
                "themeID": themeID
            })
        })
    }

    return (
        <>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Delete Theme
                </ModalHeader>

                <ModalBody>
                    <Button color="danger" onPress={deleteClick}>
                    Are you sure you want to delete<br />this theme permentally (a very very long time)?
                    </Button>
                </ModalBody>
            </ModalContent>
        </>
    )
}