//* Libraries imports
import { atom } from "jotai";

//* Types imports
import type { Timeline } from "../schemas/timeline";

export const timelineAtom = atom<null | Timeline>(null);
