//* Libraries imports
import axios from "axios";
import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";

import type { PartialBlock } from "@blocknote/core";
import type { SaveBlocksResponse } from "../../pages/api/blocks/saveBlocks";

async function saveBlocks(
  pageId: string,
  blocks: PartialBlock[]
): Promise<SaveBlocksResponse> {
  const response = await axios.post<SaveBlocksResponse>("/api/saveBlocks", {
    pageId,
    blocks,
  });
  return response.data;
}

export default function useSaveBlock(
  options?: UseMutationOptions<
    SaveBlocksResponse,
    unknown,
    { pageId: string; blocks: PartialBlock[] }
  >
): UseMutationResult<
  SaveBlocksResponse,
  unknown,
  { pageId: string; blocks: PartialBlock[] }
> {
  return useMutation(
    ({ pageId, blocks }) => saveBlocks(pageId, blocks),
    options
  );
}
