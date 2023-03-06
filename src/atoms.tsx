import { atom } from "recoil";

interface IToDos {
    [key: string]: string[];
}
const toDoState = atom<IToDos>({
    key: "toDo",
    default: {
        "to do": ["a", "b"],
        doing: ["c", "d", "e"],
        done: ["f"],
    },
});
export { toDoState };
