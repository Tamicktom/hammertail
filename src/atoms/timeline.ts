//* Libraries imports
import { atom } from "jotai";

//* Types imports
import type { Timeline } from "../schemas/timeline";

const defaultTimeline: Timeline = {
  characters: [],
  events: [],
  items: [],
  places: [],
};

export const timelineAtom = atom<Timeline>(defaultTimeline);
