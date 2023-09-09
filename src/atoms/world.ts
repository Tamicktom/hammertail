//* Libraries imports
import { atom } from "jotai";

//* Types imports
import { World } from "@prisma/client";

export const worldAtom = atom<World | null>(null);
