import { ECategories, IToDo, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import React from "react";

function ToDo({ text, id, category }: IToDo) {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onClick = (category: ECategories) => {
        const targetIdx = toDos.findIndex((toDo) => toDo.id === id);
        const newToDo = { text, id, category };
        const head = toDos.slice(0, targetIdx);
        const tail = toDos.slice(targetIdx + 1);
        setToDos([...head, newToDo, ...tail]);
    };
    return (
        <li style={{ listStyle: "none" }}>
            <span>{text}</span>
            {category !== ECategories.TO_DO && (
                <button
                    name={ECategories.TO_DO}
                    onClick={() => onClick(ECategories.TO_DO)}
                >
                    To Do
                </button>
            )}
            {category !== ECategories.DOING && (
                <button
                    name={ECategories.DOING}
                    onClick={() => onClick(ECategories.DOING)}
                >
                    Doing
                </button>
            )}
            {category !== ECategories.DONE && (
                <button
                    name={ECategories.DONE}
                    onClick={() => onClick(ECategories.DONE)}
                >
                    Done
                </button>
            )}
        </li>
    );
}
export default ToDo;
