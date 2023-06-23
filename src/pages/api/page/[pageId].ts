//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";
import { z } from "zod";

const querySchema = z.object({
  pageId: z.string(),
});

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    const reqType = req.method;
    const query = querySchema.safeParse(req.query);

    if (!query.success) {
      return res.status(401).send({
        error: "You must provide a pageId",
      });
    }

    if (reqType === "GET") {
      const page = await prisma.page.findUnique({
        where: {
          id: query.data.pageId,
        },
        include: {
          PageType: true,
        },
      });

      if (!page) {
        return res.status(404).send({
          error: "Page not found",
        });
      }

      return res.status(200).send({
        ...page,
      });
    }
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default restricted;
