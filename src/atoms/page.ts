//* Libraries imports
import { atom } from "jotai";

//* Types imports
import type { PageWorld } from "../hooks/queries/usePage";

const defaultPageWorld: PageWorld = {
  id: "",
  name: "",
  description: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  end: 0,
  start: 0,
  image: "",
  other: {
    timeline: {
      characters: [],
      events: [],
      items: [],
      places: [],
    },
  },
  PageType: {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "",
    name: "",
  },
  pageTypeId: "",
  world: {
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "",
    name: "",
    description: "",
    image: "",
    end: 0,
    start: 0,
    ownerId: "",
  },
  worldId: "",
};

export const pageAtom = atom(defaultPageWorld);
