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

async function getPagesByType(worldId: string, pageType: PageTypes) {
  const body = {
    worldId,
    listing: pageType,
    action: "ListPages",
  };
  const res = await axios.post<ApiPageListing>("/api/pages", body);
  return res;
}

export function useGetPagesByType(worldId: string, pageType: PageTypes) {
  return useQuery(
    ["pages", worldId, pageType],
    () => getPagesByType(worldId, pageType),
    {
      refetchInterval: 60000,
    }
  );
}
