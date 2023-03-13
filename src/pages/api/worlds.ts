import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";
import z from "zod";

const worlds = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  //verify if the user is logged in
  if (!session) {
    return res.send({
      content: "Login to view the protected content on this page.",
    });
  }

  const sessionUserId = session?.user?.id;
  const dbUser = await prisma.user.findUnique({
    where: {
      id: sessionUserId,
    },
  });

  //verify if the user exists
  if (!dbUser) {
    return res.send({
      content: "User not found.",
    });
  }

  //verify if is a Post request
  if (req.method === "POST") {
    const { name, startYear, endYear } = req.body;
    const worldData = z
      .object({
        name: z.string().min(1).max(50),
        startYear: z.number(),
        endYear: z.number(),
      })
      .parse({ name, startYear, endYear });

    if (!worldData) {
      return res.send({
        content: "Invalid data.",
      });
    }

    if (worldData.startYear > worldData.endYear) {
      return res.send({
        content: "Invalid data.",
      });
    }

    const world = await prisma.world.create({
      data: {
        name: worldData.name,
        start: worldData.startYear,
        end: worldData.endYear,
        owner: {
          connect: {
            id: dbUser.id,
          },
        },
      },
    });

    return res.json({
      message: "World created successfully",
      world,
    });
  }
};

export default worlds;
