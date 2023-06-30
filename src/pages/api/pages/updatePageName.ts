import type { NextApiRequest, NextApiResponse } from "next";
import { prisma, supabase } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import z from "zod";

export default async function updatePageName(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const parsed = z
    .object({
      pageId: z.string().uuid(),
      name: z.string(),
    })
    .safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error });
  }

  const { pageId, name } = parsed.data;

  const page = await prisma.page.update({
    where: {
      id: pageId,
    },
    data: {
      name,
    },
  });

  return res.status(200).json({
    error: false,
    message: "Page name updated",
  });
}
