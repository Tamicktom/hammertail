//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

//* Local imports
import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const pageDateUpdate = z.object({
  pageId: z.string().uuid({ message: "Invalid page id." }),
  start: z.number().int().min(0, { message: "Invalid start date." }),
  end: z.number().int().min(0, { message: "Invalid end date." }),
});

const worlds = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  //verify if the user is logged in
  if (!session) {
    return res.status(401).send({
      error: true,
      message: "Login to view the protected content on this page.",
    });
  }

  const sessionUserId = session?.user?.id;

  if (!sessionUserId) {
    return res.status(401).send({
      error: true,
      message: "Login to view the protected content on this page.",
    });
  }

  //verify if is a Post request
  if (req.method === "PUT") {
    const parsedDateUpdate = pageDateUpdate.safeParse(req.body);

    if (!parsedDateUpdate.success) {
      // concat all the error messages
      const errorMessage = parsedDateUpdate.error.issues;
      const errorMessageString = errorMessage.map((error) => error.message);
      return res.status(400).send({
        error: true,
        message: errorMessageString,
      });
    }

    const { pageId, start, end } = parsedDateUpdate.data;

    if (start > end)
      return res.status(400).send({
        error: true,
        message: "Start date must be before end date.",
      });

    //update the page
    const updatedPage = await prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        start,
        end,
      },
      select: {
        worldId: true,
        id: true,
        start: true,
        end: true,
        name: true,
      },
    });

    return res.status(200).send({
      error: false,
      message: "Page date updated successfully.",
      data: updatedPage,
    });
  }

  return res.status(405).send({
    error: true,
    message: "Wrong request method.",
  });
};

export default worlds;
