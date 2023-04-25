//* Libraries imports
import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//* Types imports
import type { GetBlocksResponse } from "../../pages/api/blocks/getBlocks";

async function getBlocks(pageId: string): Promise<GetBlocksResponse> {
  const response = await axios.get<GetBlocksResponse>(
    `/api/blocks/getBlocks/${pageId}`
  );
  return response.data;
}

export default function useGetBlocks(
  pageId: string
): UseQueryResult<GetBlocksResponse, unknown> {
  return useQuery(["getBlocks", pageId], () => getBlocks(pageId), {
    enabled: !!pageId,
    staleTime: 1000 * 60 * 0.5, // 30 seconds
    cacheTime: 1000 * 60 * 0.5, // 30 seconds
    refetchOnWindowFocus: true,
  });
}
