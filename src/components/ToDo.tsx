import { IToDo, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import React from "react";

function ToDo({ text, id, category }: IToDo) {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = e;
        const targetIdx = toDos.findIndex((toDo) => toDo.id === id);
        const newToDo = { text, id, category: name as IToDo["category"] };
        const head = toDos.slice(0, targetIdx);
        const tail = toDos.slice(targetIdx + 1);
        setToDos([...head, newToDo, ...tail]);
    };
    return (
        <li>
            <span>{text}</span>
            {category !== "TO_DO" && (
                <button name="TO_DO" onClick={onClick}>
                    To Do
                </button>
            )}
            {category !== "DOING" && (
                <button name="DOING" onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== "DONE" && (
                <button name="DONE" onClick={onClick}>
                    Done
                </button>
            )}
        </li>
    );
}
export default ToDo;
