//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//* Local imports
import type { Page } from "@prisma/client";
import type { PageTypes } from "../../types/page";

type ApiPageListing = {
  listing: PageTypes;
  pages: Page[];
};

async function getPagesByType(
  pageType: PageTypes = "undefined",
  worldId?: string
) {
  if (!worldId)
    return {
      data: {
        pages: [],
        listing: pageType,
      },
    };
  const body = {
    worldId,
    listing: pageType,
    action: "ListPages",
  };
  const res = await axios.post<ApiPageListing>("/api/pages", body);
  return res;
}

export function useGetPagesByType(pageType: PageTypes, worldId?: string) {
  return useQuery(
    ["pages", pageType, worldId],
    () => getPagesByType(pageType, worldId),
    {
      refetchInterval: 60000,
    }
  );
}
