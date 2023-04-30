//* Libraries imports
import { type NextApiRequest, type NextApiResponse } from "next";
import z from "zod";

//* Local imports
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";
import { supabase } from "../../../server/db/client";

//* Types
import type { PartialBlock } from "@blocknote/core";
export type SaveBlocksResponse = {
  message: string;
};

const blocksSchema = z.array(
  z.object({
    id: z.string(),
    type: z.string(),
    props: z.object({
      textColor: z.string(),
      backgroundColor: z.string(),
      textAlignment: z.string(),
      level: z.string(),
    }),
    children: z.array(z.any()),
    content: z.array(z.any()),
  })
);

export default async function saveBlocks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });

  //verify if the user is logged in
  if (!session) {
    return res.send({
      content: "Login to view the protected content on this page.",
    });
  }

  //verify the request method
  if (req.method !== "POST") {
    return res.send({
      content: "Invalid request method",
    });
  }

  //save the blocks on supabase storage
  const { pageId, blocks } = req.body;

  const parsedBlocks = blocksSchema.parse(blocks);
  const stringifiedBlocks = JSON.stringify(parsedBlocks);

  const { data, error } = await supabase.storage
    .from("pages")
    .upload(`${pageId}.json`, stringifiedBlocks);

  if (error) {
    if (error.message === "The resource already exists") {
      const { data, error: error2 } = await supabase.storage
        .from("pages")
        .update(`${pageId}.json`, stringifiedBlocks);
      if (error2) {
        res.send({
          message: "Error saving blocks",
        });
      }
    } else {
      res.send({
        message: "Error saving blocks",
        error,
      });
    }
  }

  res.send({
    message: "Blocks saved successfully",
  });
}
