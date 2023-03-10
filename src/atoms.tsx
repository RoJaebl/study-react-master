import { atom } from "recoil";

export interface IContent {
    id: number;
    text: string;
    modify: boolean;
}
export interface IBoard {
    id: number;
    name: string;
    contents: IContent[];
}
export type BoardType = IBoard[];

const boardState = atom<BoardType>({
    key: "board",
    default: JSON.parse(localStorage.getItem("board") ?? `[]`),
    effects: [
        ({ onSet }) =>
            onSet((newValue) =>
                localStorage.setItem("board", JSON.stringify(newValue))
            ),
    ],
});
export { boardState };
