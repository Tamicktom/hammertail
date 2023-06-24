//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";
import { z } from "zod";

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    const reqType = req.method;
    const { name, worldId, action, listing, typeOfPage, pageData } = req.body;

    if (action === undefined) {
      return res.status(401).send({
        error: "You must provide an action",
      });
    }
    const possibleActions = z.enum([
      "createSpecificPage",
      "createPage",
      "DeletePage",
      "ListPages",
    ]);
    const possibleListing = z.enum([
      "characters",
      "places",
      "items",
      "events",
      "undefined",
    ]);
    const schema = z.object({
      name: z.string().optional(),
      worldId: z.string(),
      action: possibleActions,
      listing: possibleListing.optional(),
      typeOfPage: possibleListing.optional(),
      pageData: z
        .object({
          name: z.string(),
          description: z.string().optional(),
          birthYear: z.number(),
          deathYear: z.number(),
          other: z.unknown().optional(),
        })
        .optional(),
    });

    const tmp = schema.parse({
      name,
      worldId,
      action,
      listing,
      typeOfPage,
      pageData,
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
      if (tmp.listing === undefined || tmp.listing === "undefined") {
        //grab the pages that does not have pageType
        const pages = await prisma.page.findMany({
          where: {
            worldId: tmp.worldId,
            pageTypeId: null,
          },
        });

        return res.status(200).send({
          listing: tmp.listing,
          pages: pages,
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

    //  create a page with a specific type
    if (reqType === "POST" && tmp.action === "createSpecificPage") {
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
              name: tmp.pageData?.name,
              PageType: {
                name: tmp.typeOfPage,
              },
            },
          },
        },
      });

      if (pageExists?.Pages.length !== 0) {
        return res.status(401).send({
          error: "This page already exists",
        });
      }

      // create the page
      if (
        tmp.typeOfPage === "characters" ||
        tmp.typeOfPage === "places" ||
        tmp.typeOfPage === "items" ||
        tmp.typeOfPage === "events"
      ) {
        if (tmp.pageData === undefined) {
          return res.status(401).send({
            error: "You must provide page data",
          });
        }

        const page = await prisma.page.create({
          data: {
            name: tmp.pageData?.name || "No name",
            worldId: tmp.worldId,
            pageTypeId: pageType?.id,
            start: tmp.pageData?.birthYear || 0,
            end: tmp.pageData?.deathYear || 0,
            description: tmp.pageData?.description || "No description",
            other: tmp.pageData?.other || "No other",
          },
        });

        return res.status(200).send({
          page: page,
          status: "created",
        });
      }
    }

    //  create a page
    if (reqType === "POST" && tmp.action === "createPage") {
      const page = await prisma.page.create({
        data: {
          name: "No name",
          worldId: tmp.worldId,
          start: 0,
          end: 0,
          description: "No description",
        },
      });

      return res.status(200).send({
        page: page,
        status: "created",
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
