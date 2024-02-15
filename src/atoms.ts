import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const mainContentAtom = atom({
  key: "mainContentAtom",
  default: {
    text: "",
    canCopy: true,
    viewOnce: false,
  },
  effects_UNSTABLE: [persistAtom],
});

export const publishHistoryAtom = atom({
  key: "publishHistory",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const viewHistoryAtom = atom({
  key: "viewHistory",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
