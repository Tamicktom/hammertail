//* Libraries imports
import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//* Types imports
import type { Page, PageType, World } from "@prisma/client";

export type PageWorld = Page & {
  PageType: PageType;
  world: World;
};

async function getPage(pageId: string): Promise<PageWorld> {
  const response = await axios.get<PageWorld>(`/api/page/${pageId}`);
  return response.data;
}

/**
 * Hook to get full information about a page from the server.
 */

export default function usePage(
  pageId: string
): UseQueryResult<PageWorld, unknown> {
  return useQuery(["page", pageId], () => getPage(pageId), {
    enabled: !!pageId, //only fetch if there is a pageId
    refetchOnWindowFocus: true,
  });
}
