import { atom } from "recoil";

interface IToDos {
    [key: string]: string[];
}
const toDoState = atom<IToDos>({
    key: "toDo",
    default: {
        to_do: ["a", "b"],
        diubg: ["c", "d", "e"],
        done: ["f"],
    },
});
export { toDoState };
