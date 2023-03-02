import { atom, selector } from "recoil";

interface IToDo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

export const categoryState = atom<IToDo["category"]>({
    key: "category",
    default: "TO_DO",
});
const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) =>
        get(toDoState).filter((toDo) => toDo.category === get(categoryState)),
});
export { toDoState };
export type { IToDo };
