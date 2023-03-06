//* Libraries imports
import { type NextApiRequest, type NextApiResponse } from "next";

//* Local imports
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";

//* Types imports
import type { World } from "@prisma/client";
import type { APIResponse } from "../../../types/api";

/**
 * This function is used to get the owner of the world
 */
const getOwner = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  const Response: APIResponse<World> = {
    status: "error",
    errors: [],
  };

  //verify if the user is logged in
  if (!session) {
    Response.errors?.push("Login to view the protected content on this page.");
    return res.json(Response);
  }

  // Get the user from the database
  const sessionUserId = session?.user?.id;
  let dbUser = null;

  try {
    dbUser = await prisma.user.findUnique({
      where: {
        id: sessionUserId,
      },
    });
  } catch (error) {
    Response.errors?.push("An error occurred while getting the user.");
    return res.json(Response);
  }
  //verify if the user exists
  if (!dbUser) {
    Response.errors?.push("User not found.");
    return res.json(Response);
  }

  if (req.method === "POST") {
    const { worldId } = req.body; // Get the world id from the request body

    // Get the world from the database
    const world = await prisma.world.findUnique({
      where: {
        id: worldId,
      },
    });

    //verify if the world exists
    if (!world) {
      Response.errors?.push("World not found.");
      return res.json(Response);
    }

    //verify if the user is the owner of the world
    if (world.ownerId !== dbUser.id) {
      Response.errors?.push("You are not the owner of this world.");
      return res.json(Response);
    }

    Response.status = "success";
    Response.data = world;

    return res.json(Response);
  }
};

export default getOwner;
