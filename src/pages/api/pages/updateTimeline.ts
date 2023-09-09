import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

//* Schema
import { updateTimelineSchema } from "../../../schemas/timeline";

export default async function updatePageName(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerAuthSession({ req, res });
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const parsed = updateTimelineSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error });
  }

  const { pageId, timeline } = parsed.data;

  const page = await prisma.page.update({
    where: {
      id: pageId,
    },
    data: {
      other: {
        timeline,
      },
    },
  });

  if (!page) {
    return res.status(400).json({ error: "Page not found" });
  }

  return res.status(200).json({
    error: false,
    message: "Page timeline updated",
  });
}
