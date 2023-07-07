//* Libraries imports
import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//* Types imports
import type { Page, PageType, World } from "@prisma/client";

async function getPage(pageId: string): Promise<
  Page & {
    PageType: PageType;
    world: World;
  }
> {
  const response = await axios.get<
    Page & {
      PageType: PageType;
      world: World;
    }
  >(`/api/page/${pageId}`);
  return response.data;
}

/**
 * Hook to get full information about a page from the server.
 */

export default function usePage(
  pageId: string
): UseQueryResult<Page & { PageType: PageType }, unknown> {
  return useQuery(["page", pageId], () => getPage(pageId), {
    enabled: !!pageId, //only fetch if there is a pageId
    refetchOnWindowFocus: true,
  });
}
