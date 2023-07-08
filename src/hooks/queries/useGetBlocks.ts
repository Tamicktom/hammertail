//* Libraries imports
import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//* Types imports
import type { PartialBlock } from "@blocknote/core";
import type { GetBlocksResponse } from "../../pages/api/blocks/getBlocks";

async function getBlocks(pageId: string): Promise<PartialBlock[]> {
  const response = await axios.post<GetBlocksResponse>(
    `/api/blocks/getBlocks`,
    {
      pageId,
    }
  );

  let blocks: PartialBlock[] | null = null;

  if (response.data.url) {
    //grab the json from the url
    const { data } = await axios.get(response.data.url);
    if (data) {
      console.log("data", data);
      blocks = data as PartialBlock[];
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
): UseQueryResult<PartialBlock[], unknown> {
  return useQuery(["getBlocks", pageId], () => getBlocks(pageId), {
    enabled: !!pageId, //only fetch if there is a pageId
    refetchOnWindowFocus: true,
  });
}
