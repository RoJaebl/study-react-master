import { atom, selector } from "recoil";

const minuteState = atom({
    key: "minutes",
    default: 0,
});
const hourSelector = selector({
    key: "hour",
    get: ({ get }) => get(minuteState) / 60,
    set: ({ set }, newValue) => set(minuteState, +newValue * 60),
});
export { minuteState, hourSelector };
