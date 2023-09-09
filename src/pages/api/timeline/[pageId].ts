//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";
import { z } from "zod";

//* Schemas imports
import { timelineSchema, type Timeline } from "../../../schemas/timeline";
import type { PageWorld } from "../../../hooks/queries/usePage";

const defaultTimeline: Timeline = {
  characters: [],
  events: [],
  items: [],
  places: [],
};

const querySchema = z.object({
  pageId: z.string(),
});

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  const reqType = req.method;
  const query = querySchema.safeParse(req.query);

  if (!query.success) {
    return res.status(401).send({
      error: "You must provide a pageId",
    });
  }

  if (reqType === "GET") {
    const page = (await prisma.page.findUnique({
      where: {
        id: query.data.pageId,
      },
      include: {
        PageType: true,
        world: true,
      },
    })) as PageWorld | null; //criminal but it works

    if (!page) {
      return res.status(404).send({
        error: "Page not found",
      });
    }

    if (!page.other || !page.other.timeline) {
      return res.status(200).send({
        error: false,
        timeline: defaultTimeline,
      });
    }

    const timeline = timelineSchema.safeParse(page.other.timeline);

    if (!timeline.success) {
      return res.status(500).send({
        error: true,
        errors: ["Unable to parse timeline"],
      });
    }

    return res.status(200).send({
      error: false,
      timeline: timeline.data,
    });
  }
};

export default restricted;
