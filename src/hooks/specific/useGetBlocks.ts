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
  console.log("getBlocks response", response.data);

  let blocks: PartialBlock[] = [];
  if (response.data.url) {
    //grab the json from the url
    const { data } = await axios.get(response.data.url);
    console.log("getBlocks data", data);
    if (data) {
      blocks = data.blocks;
    }
  } else if (response.data.blocks) {
    blocks = response.data.blocks;
  }

  return blocks;
}

export default function useGetBlocks(
  pageId: string
): UseQueryResult<PartialBlock[], unknown> {
  return useQuery(["getBlocks", pageId], () => getBlocks(pageId), {
    enabled: !!pageId, //only fetch if there is a pageId
    refetchOnWindowFocus: true,
  });
}
