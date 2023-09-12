//* libraries imports
import { atom } from "jotai";

type SaveState = "saved" | "saving" | "error" | "idle";

export const saveStateAtom = atom<SaveState>("idle");

