//* Libraries imports
import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";

import type { PartialBlock, BlockSchema } from "@blocknote/core";
import type { SaveBlocksResponse } from "../../pages/api/blocks/saveBlocks";

async function saveBlocks(
  pageId: string,
  blocks: PartialBlock<BlockSchema>[]
): Promise<SaveBlocksResponse> {
  const response = await axios.post<SaveBlocksResponse>(
    "/api/blocks/saveBlocks",
    {
      pageId,
      blocks,
    }
  );
  console.log("Save blocks", response.data);
  return response.data;
}

export default function useSaveBlock(
  options?: UseMutationOptions<
    SaveBlocksResponse,
    unknown,
    { pageId: string; blocks: PartialBlock<BlockSchema>[] }
  >
): UseMutationResult<
  SaveBlocksResponse,
  unknown,
  { pageId: string; blocks: PartialBlock<BlockSchema>[] }
> {
  return useMutation(
    ({ pageId, blocks }) => saveBlocks(pageId, blocks),
    options
  );
}
