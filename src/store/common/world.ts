import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { World } from "@prisma/client";

interface WorldList {
  worlds: World[];
  updateWorlds: (w: World[]) => void;
}

const worldList = create<WorldList>()(
  devtools(
    persist(
      (set) => ({
        worlds: [],
        updateWorlds: (w: World[]) => set({ worlds: w }),
      }),
      { name: "world-list" }
    )
  )
);

export default worldList;
