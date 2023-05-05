//* Libraries imports
import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//* Types imports
import type { Page } from "@prisma/client";

async function getPage(pageId: string): Promise<Page> {
  const response = await axios.post<Page>(`/api/blocks/getBlocks`, {
    pageId,
  });
  return response.data;
}

/**
 * Hook to get full information about a page from the server.
 */

export default function usePage(pageId: string): UseQueryResult<Page, unknown> {
  return useQuery(["getBlocks", pageId], () => getPage(pageId), {
    enabled: !!pageId, //only fetch if there is a pageId
    refetchOnWindowFocus: true,
  });
}
