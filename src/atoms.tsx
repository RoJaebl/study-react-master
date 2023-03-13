import { atom } from "recoil";

export interface IDnD {
    id: number;
    modify: boolean;
    dropId: string;
    dragId: string;
    name?: string;
    text?: string;
}
export interface IDnDs {
    [key: string]: IDnD[];
}
const contentState = atom<IDnDs>({
    key: "contents",
    default: JSON.parse(localStorage.getItem("contents") ?? `{}`),
    effects: [
        ({ onSet }) =>
            onSet((newValue) =>
                localStorage.setItem("contents", JSON.stringify(newValue))
            ),
    ],
});
const boardState = atom<IDnD[]>({
    key: "boards",
    default: JSON.parse(localStorage.getItem("boards") ?? `[]`),
    effects: [
        ({ onSet }) =>
            onSet((newValue) =>
                localStorage.setItem("boards", JSON.stringify(newValue))
            ),
    ],
});

export { boardState, contentState };
