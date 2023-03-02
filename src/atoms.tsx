import { atom, selector } from "recoil";

export enum ECategories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}
interface IToDo {
    text: string;
    id: number;
    category: ECategories;
}

export const categoryState = atom<ECategories>({
    key: "category",
    default: ECategories.TO_DO,
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
