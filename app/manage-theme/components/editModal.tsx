import { ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export function EditModal(props: any) {
    const themeID = props.themeID;

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
                    />

                    <Input
                        label="Description"
                        placeholder="Enter a new theme description"
                        variant="bordered"
                    />
                </ModalBody>

                <ModalFooter>
                    <Button color="primary">
                    Confirm edits
                    </Button>
                </ModalFooter>
            </ModalContent>
        </>
    )
}