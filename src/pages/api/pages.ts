//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";
import { z } from "zod";

type Character = {
  name: string;
  description: string;
  birthYear: number;
  deathYear: number;
};

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    const reqType = req.method;
    const { name, worldId, action, listing, typeOfPage, character } = req.body;

    if (action === undefined) {
      return res.status(401).send({
        error: "You must provide an action",
      });
    }
    const possibleActions = z.enum(["createPage", "DeletePage", "ListPages"]);
    const possibleListing = z.enum(["characters", "items", "events", "places"]);
    const schema = z.object({
      name: z.string().optional(),
      worldId: z.string(),
      action: possibleActions,
      listing: possibleListing.optional(),
      typeOfPage: possibleListing.optional(),
      character: z
        .object({
          name: z.string(),
          description: z.string().optional(),
          birthYear: z.number(),
          deathYear: z.number(),
        })
        .optional(),
    });

    const tmp = schema.parse({
      name,
      worldId,
      action,
      listing,
      typeOfPage,
      character,
    });

    //  verify if  the user is owner of the world
    const isOwner = await prisma.world.findUnique({
      where: {
        id: tmp.worldId,
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

    // list pges
    if (reqType === "POST" && tmp.action === "ListPages") {
      console.log("listing");
      if (tmp.listing === undefined) {
        return res.status(401).send({
          error: "You must specify a listing",
        });
      }
      //grab the id of the page type that has the name of the listing
      const pageType = await prisma.pageType.findFirst({
        where: {
          name: tmp.listing,
        },
        select: {
          id: true,
        },
      });

      if (pageType === null) {
        return res.status(401).send({
          error: "This listing does not exist",
          listing: tmp.listing,
        });
      }

      const pages = await prisma.page.findMany({
        where: {
          pageTypeId: pageType.id,
          worldId: tmp.worldId,
        },
      });

      return res.status(200).send({
        listing: tmp.listing,
        pages: pages,
      });
    }

    //  create a page
    if (reqType === "POST" && tmp.action === "createPage") {
      //get page type name from typeOfPage
      const pageType = await prisma.pageType.findFirst({
        where: {
          name: tmp.typeOfPage,
        },
        select: {
          id: true,
        },
      });

      if (pageType === null) {
        return res.status(401).send({
          error: "This page type does not exist",
          typeOfPage: tmp.typeOfPage,
        });
      }

      //  verify if the page already exists, using the name and the page type
      const pageExists = await prisma.world.findUnique({
        where: {
          id: tmp.worldId,
        },
        select: {
          Pages: {
            where: {
              name: tmp.character?.name,
              PageType: {
                name: tmp.typeOfPage,
              },
            },
          },
        },
      });

      console.log(pageExists);

      if (pageExists?.Pages.length !== 0) {
        return res.status(401).send({
          error: "This page already exists",
        });
      }

      // create the page
      if (tmp.typeOfPage === "characters") {
        if (tmp.character === undefined) {
          return res.status(401).send({
            error: "You must provide a character",
          });
        }

        const page = await prisma.page.create({
          data: {
            name: tmp.character?.name || "No name",
            worldId: tmp.worldId,
            pageTypeId: pageType?.id,
            start: tmp.character?.birthYear || 0,
            end: tmp.character?.deathYear || 0,
            description: tmp.character?.description || "No description",
          },
        });

        return res.status(200).send({
          page: page,
          status: "created",
        });
      }
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
