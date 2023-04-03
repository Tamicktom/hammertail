import { useState } from "react";
import { CheckSquare, Square } from "@phosphor-icons/react";
import type { Dispatch, SetStateAction } from "react";


type Props = {
    TodoText: string;
    IsChecked: boolean;
}

type CheckBoxProps = {
    CheckBox: boolean;
    setCheckBox: Dispatch<SetStateAction<boolean>>
}


export const TodoBlock = ({ TodoText, IsChecked }: Props) => {

    const [checked, setchecked] = useState<boolean>(IsChecked)

    return (
        <div className="flex flex-row w-full">
            <CheckBox CheckBox={checked} setCheckBox={setchecked} />
            <p className={
                 checked
                 ? "text-white h-5 line-through"
                 : "text-white h-5"
            }>
                {TodoText}
            </p>
        </div>
    )
}

const CheckBox = ({ CheckBox, setCheckBox }: CheckBoxProps) => {

    const HandleClick = () => {
        setCheckBox(!CheckBox)
    }
    return (
        <button onClick={HandleClick}>
            {
                CheckBox
                    ? <CheckSquare className="text-white w-5 h-5" />
                    : <Square className="text-white w-5 h-5" />
            }
        </button>
    )

}

