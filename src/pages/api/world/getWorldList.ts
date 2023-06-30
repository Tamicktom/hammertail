//* Libraries imports
import { type NextApiRequest, type NextApiResponse } from "next";

//* Local imports
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";
import { parseWorlds } from "../../../utils/parseWorld";

//* Types imports
import type { World } from "@prisma/client";
import type { APIResponse } from "../../../types/api";

/**
 * This function is used to get the owner of the world
 */
const getOwner = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  const Response: APIResponse<World[]> = {
    status: "error",
    errors: [],
  };

  //verify if the user is logged in
  if (!session) {
    Response.errors?.push("Login to view the protected content on this page.");
    return res.json(Response);
  }

  if (!session.user?.id) {
    Response.errors?.push("User not found.");
    return res.json(Response);
  }

  if (req.method === "GET") {
    const userId = session.user.id;

    // Get the worlds from the database
    const worlds = await prisma.world.findMany({
      where: {
        ownerId: userId,
      },
    });

    Response.status = "success";
    Response.data = parseWorlds(worlds);
    console.log("Server side Worlds: ", Response.data);

    return res.json(Response);
  }
};

export default getOwner;
