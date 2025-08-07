import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";

export function NewThemeModal(props: any) {
    const setNewTheme = props.setNewTheme;

    function createTheme() {
        const name = document.getElementById("newName")?.value;
        const description = document.getElementById("newDesc")?.value;

        fetch("../api/themes", {
            method: "POST",
            body: JSON.stringify({
                "name": name,
                "description": description
            })
        })
        .catch(e => addToast({
                title: "Failed to create new theme",
                color: "danger"
            })
        );

        setNewTheme(false);
    }

    return (
        <>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    New Theme
                </ModalHeader>

                <ModalBody>
                    <Input
                        label="Name"
                        placeholder="Enter the name of your new theme"
                        variant="bordered"
                        id="newName"
                    />

                    <Input
                        label="Description"
                        placeholder="Enter the description of your new theme"
                        variant="bordered"
                        id="newDesc"
                    />
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onPress={createTheme}>
                    Create Theme
                    </Button>
                </ModalFooter>
            </ModalContent>
        </>
    )
}