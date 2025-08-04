import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export function EditModal(props: any) {
    const themeID = props.themeID;

    function editClick() {
        const newName = document.getElementById("editName")?.value;
        const newDescription = document.getElementById("editDescription")?.value;

        fetch("../api/themes/edit", {
            method: "PUT",
            body: JSON.stringify({
                "themeID": themeID,
                "name": newName,
                "description": newDescription
            })
        })
    }

    return (
        <>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Edit Theme
                </ModalHeader>

                <ModalBody>
                    <Input
                        label="Name"
                        placeholder="Enter a new theme name"
                        variant="bordered"
                        id="editName"
                    />

                    <Input
                        label="Description"
                        placeholder="Enter a new theme description"
                        variant="bordered"
                        id="editDescription"
                    />
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onPress={editClick}>
                    Confirm edits
                    </Button>
                </ModalFooter>
            </ModalContent>
        </>
    )
}