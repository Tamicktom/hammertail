import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";
import z from "zod";

const saveText = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const typesOfBlocks = z.enum(["paragraph", "heading", "default"]);

  const blockSchema = z.object({
    id: z.string(),
    type: typesOfBlocks,
    content: z.string(),
    order: z.number().min(0),
    html: z.string().optional(),
    props: z.object({
      level: z.number().optional(),
    }),
    children: z.array(z.object({})),
  });

  const blocksSchema = z.array(blockSchema);
};

export default saveText;