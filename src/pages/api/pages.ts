//* Libraries imports
import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    const reqType = req.method;
    const { name, worldId } = req.body;

    if (reqType === "GET") {
    }

    if (reqType === "POST") {
      //  verify if  the user is owner of the world
      const isOwner = await prisma.world.findUnique({
        where: {
          id: worldId,
        },
        select: {
          ownerId: true,
        },
      });

      if (isOwner?.ownerId !== session?.user?.id) {
        res.status(401).send({
          error: "You are not the owner of this world",
        });
      }

      //  verify if the page already exists
      const pageExists = await prisma.world.findUnique({
        where: {
          id: worldId,
        },
        select: {
          Pages: {
            where: {
              name: name,
            },
          },
        },
      });

      if (
        pageExists?.Pages.length !== 0 ||
        pageExists?.Pages.length === undefined
      ) {
        return res.status(401).send({
          error: "This page already exists",
        });
      }

      //  create the page
      const page = await prisma.page.create({
        data: {
          name: name,
          worldId: worldId,
        },
      });

      return res.status(200).send({
        page: page,
      });
    }

    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default restricted;
