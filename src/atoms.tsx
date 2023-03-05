import { atom, selector } from "recoil";

const TO_DO_STORAGY = "toDoStoragy";

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
    default: JSON.parse(localStorage.getItem(TO_DO_STORAGY) ?? `[]`),
    effects: [
        ({ onSet }) =>
            onSet((newToDo) =>
                localStorage.setItem(TO_DO_STORAGY, JSON.stringify(newToDo))
            ),
    ],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({ get }) =>
        get(toDoState).filter((toDo) => toDo.category === get(categoryState)),
});
export { toDoState, TO_DO_STORAGY };
export type { IToDo };
