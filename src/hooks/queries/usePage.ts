//* Libraries imports
import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//* Types imports
import type { Page, PageType, World } from "@prisma/client";
import type { Timeline } from "../../schemas/timeline";

// export type PageWorld = Page & {
//   PageType: PageType;
//   world: World;
// };
interface PageOther extends Page {
  other: null | {
    timeline: Timeline;
  };
}
export interface PageWorld extends PageOther {
  PageType: PageType;
  world: World;
}

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
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });
}
