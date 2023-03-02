import { atom, selector } from "recoil";

interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}
const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

interface IToDoSelector {
    to_do: IToDo[];
    doing: IToDo[];
    done: IToDo[];
}
export const toDoSelector = selector<IToDoSelector>({
    key: "toDoSelector",
    get: ({ get }) => {
        const toDos = get(toDoState);
        return {
            to_do: toDos.filter((toDo) => toDo.category === "TO_DO"),
            doing: toDos.filter((toDo) => toDo.category === "DOING"),
            done: toDos.filter((toDo) => toDo.category === "DONE"),
        };
    },
});
export { toDoState };
export type { IToDo };
