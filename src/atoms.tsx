import { atom } from "recoil";

const toDoState = atom({
    key: "toDo",
    default: ["a", "b", "c", "d", "e", "f"],
});
export { toDoState };
