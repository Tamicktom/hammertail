import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";

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
    const { name } = req.body;

    const world = await prisma.world.create({
      data: {
        name,
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
