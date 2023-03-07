import { atom } from "recoil";

export interface IToDo {
    id: number;
    text: string;
}
interface IToDos {
    [key: string]: IToDo[];
}
const toDoState = atom<IToDos>({
    key: "toDo",
    default: {
        "to do": [],
        doing: [],
        done: [],
    },
});
export { toDoState };
