import { atom } from "recoil";

export interface IContentState {
    id: number;
    modify: boolean;
    dragId: string;
    name?: string;
    text?: string;
}
export interface IContent {
    [key: string]: IContentState[];
}
export interface IBoardConent {
    [key: string]: IContent;
}
// const testObj: IBoardConent = {
//     board: {
//         how: [{ id: 1, modify: false, dragId: "hi" }],
//         are: [{ id: 2, modify: false, dragId: "hi" }],
//     },
//     content: {
//         how: [{ id: 3, modify: false, dragId: "hi" }],
//         are: [{ id: 4, modify: false, dragId: "hi" }],
//     },
// };
// console.log(Object.keys(testObj["board"]).shift());
export const BOARD = "board";
export const CONTENT = "content";
const contentState = atom<IBoardConent>({
    key: "contents",
    default: JSON.parse(
        localStorage.getItem("contents") ??
            `{
        "${BOARD}":{"boardContent":[]},
        "${CONTENT}":{}
    }`
    ),
    effects: [
        ({ onSet }) =>
            onSet((newValue) =>
                localStorage.setItem("contents", JSON.stringify(newValue))
            ),
    ],
});
export { contentState };
