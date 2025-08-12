import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

import { DeleteIcon } from "@/helpers/icons";

export default function Actions(props: any) {
    const setCreateHabit = props.setCreateHabit;
    const onOpen = props.onOpen;
    const setHabitId = props.setHabitId;
    const thisHabit = props.thisHabit;

    function deleteHabitFunc() {
        updateHabitId()
        setCreateHabit(false);
    }

    function updateHabitId() {
        setHabitId(thisHabit)
    }

    return (
        <div>
            <Button onPress={onOpen} onPressStart={deleteHabitFunc}>
                <Tooltip color="danger" content="Delete habit">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                    </span>
                </Tooltip>
            </Button>
        </div>
    )
}