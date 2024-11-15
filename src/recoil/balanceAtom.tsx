import { atom } from "recoil";

export const balanceState = atom({
    key: "currentBalance",
    default: 0
  });