//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import z from "zod";

// export type DbBlock = {
//   id: string
//   path: string
//   blockType: string
//   createdAt: Date
//   updatedAt: Date
//   pageId: string
// }

async function getBlocks(pageId: string) {
  const body = {
    pageId,
  };

  const { data, status } = await axios.post("/api/text/getBlocks", body);

  console.log("data:", data); // data: {blocks: []}

  if (status !== 200) {
    throw new Error("Something went wrong");
  }

  const dbBlocksSchema = z.array(
    z.object({
      id: z.string(),
      path: z.string(),
      blockType: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      pageId: z.string(),
    })
  );

  try {
    const dbBlocks = dbBlocksSchema.parse(data.blocks);
    console.log("dbBlocks:", dbBlocks); // dbBlocks: []
    return dbBlocks;
  } catch (error) {
    throw new Error("Something went wrong");
  }
}

export default function useTextEditorInitialState(pageId: string) {
  const {
    data: blocks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blocks"],
    queryFn: () => getBlocks(pageId),
  });
  return { blocks, isLoading, isError };
}
