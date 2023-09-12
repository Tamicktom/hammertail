//* Libraries imports
import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//* Types imports
import type { PartialBlock, BlockSchema } from "@blocknote/core";
import type { GetBlocksResponse } from "../../pages/api/blocks/getBlocks";

async function getBlocks(pageId: string): Promise<PartialBlock<BlockSchema>[]> {
  const response = await axios.post<GetBlocksResponse>(
    `/api/blocks/getBlocks`,
    {
      pageId,
    }
  );

  let blocks: PartialBlock<BlockSchema>[] | null = null;

  if (response.data.url) {
    //grab the json from the url
    const { data } = await axios.get(response.data.url);
    if (data) {
      blocks = data as PartialBlock<BlockSchema>[];
      return blocks;
    }
  }

  if (response.data.blocks) {
    blocks = response.data.blocks;
    return blocks;
  }

  if (!response.data.url && !response.data.url) {
    blocks = [];
    return blocks;
  }

  return [];
}

export default function useGetBlocks(
  pageId: string
): UseQueryResult<PartialBlock<BlockSchema>[], unknown> {
  return useQuery(["getBlocks", pageId], () => getBlocks(pageId), {
    enabled: !!pageId, //only fetch if there is a pageId
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });
}
