import { atom } from "recoil";

export const mainContentAtom = atom({
  key: "mainContentAtom",
  default: {
    text: "",
    canCopy: false,
    viewOnce: false,
  },
});
