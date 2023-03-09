import { atom } from "recoil";

export interface IToDo {
    id: number;
    text: string;
    isModify: boolean;
}
type IBoardKey = string;
interface IToDos {
    [key: IBoardKey]: IToDo[];
}

const toDoState = atom<IToDos>({
    key: "toDo",
    default: JSON.parse(
        localStorage.getItem("toDos") ??
            `{"to do": [], "doing": [], "done": []}`
    ),
    effects: [
        ({ onSet }) =>
            onSet((newValue) =>
                localStorage.setItem("toDos", JSON.stringify(newValue))
            ),
    ],
});
export { toDoState };
export type { IBoardKey };
