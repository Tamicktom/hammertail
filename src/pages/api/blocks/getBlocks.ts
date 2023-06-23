//* Libraries imports
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma, supabase } from "../../../server/db/client";
import z from "zod";

//* Types imports
import type { PartialBlock } from "@blocknote/core";

export type GetBlocksResponse = {
  blocks?: PartialBlock[];
  url?: string;
};

export default async function getBlocks(
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

  //grab the pageId from the request body
  const { pageId } = req.body;

  //verify the pageId
  const pageIdSchema = z.string();

  try {
    pageIdSchema.parse(pageId);
  } catch (error) {
    return res.send({
      content: "Invalid pageId",
    });
  }

  //grab the page content from the supabase storage
  // verify if there is a json file with the pageId
  const { data, error } = await supabase.storage
    .from(`pages`)
    .createSignedUrl(`${pageId}.json`, 1000 * 60); // 60 seconds

  if (error?.message === "The resource was not found") {
    //this indicates that the page content does not exist yet. So, we return an empty array
    const blocks: PartialBlock[] = [
      {
        id: "1",
        type: "paragraph",
        content: "Create your first block!",
      },
    ];
    return res.send({
      blocks,
    });
  }

  //verify if the page content exists
  if (!data) {
    return res.send({
      content: "Page content not found",
    });
  }

  //return the signed url
  res.send({
    url: data.signedUrl,
  });
}
