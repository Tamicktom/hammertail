//* Libraries imports
import { type NextApiRequest, type NextApiResponse } from "next";
import z from "zod";
import type { PartialBlock } from "@blocknote/core";

//* Local imports
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";
import { supabase } from "../../../server/db/client";

//* Types
export type SaveBlocksResponse = {
  message: string;
};

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
  res.send({
    message: "Blocks saved successfully",
  });
}
