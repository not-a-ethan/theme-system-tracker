import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";

export function NewThemeModal() {
    function createTheme() {
        fetch("../api/themes", {
            method: "POST"
        })
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
                    />

                    <Input
                        label="Description"
                        placeholder="Enter the description of your new theme"
                        variant="bordered"
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