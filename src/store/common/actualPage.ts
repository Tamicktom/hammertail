import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Page, PageType } from "@prisma/client";

type PageWithPageType = Page & { PageType: PageType };

interface actualPage {
  actualPage: PageWithPageType | null;
  updatePage: (p: PageWithPageType) => void;
}

const actualPage = create<actualPage>()(
  devtools(
    persist(
      (set) => ({
        actualPage: null,
        updatePage: (p: PageWithPageType) => set({ actualPage: p }),
      }),
      { name: "actualPage" }
    )
  )
);

export default actualPage;
