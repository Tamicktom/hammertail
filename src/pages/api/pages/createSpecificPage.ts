//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";
import { z } from "zod";

export const pageTypeSchema = z.enum([
  "characters",
  "places",
  "items",
  "events",
]);

export type PageTypes = z.infer<typeof pageTypeSchema>;

export const createSpecificPageSchema = z.object({
  worldId: z.string().uuid(),
  pageType: pageTypeSchema,
});

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session)
    return res.status(401).send({
      ok: false,
      error:
        "You must be signed in to view the protected content on this page.",
    });

  const pageData = createSpecificPageSchema.safeParse(req.body);

  if (!pageData.success) {
    return res.status(400).send({
      ok: false,
      error: pageData.error,
    });
  }

  const { worldId, pageType } = pageData.data;

  const pageTypeId = await prisma.pageType.findFirst({
    where: {
      name: pageType,
    },
  });

  if (!pageTypeId) {
    return res.status(400).send({
      ok: false,
      error: "Invalid page type",
    });
  }

  const newPage = await prisma.page.create({
    data: {
      name: "New Page",
      pageTypeId: pageTypeId.id,
      worldId,
    },
    include: {
      PageType: true,
      world: true,
    },
  });

  return res.status(200).send({
    ok: true,
    page: newPage,
  });
};

export default restricted;
