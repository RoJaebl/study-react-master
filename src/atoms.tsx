import { atom } from "recoil";

interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}
const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export { toDoState };
export type { IToDo };
