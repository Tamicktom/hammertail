//* Libraries imports
import { type NextApiRequest, type NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { env } from "../../../env/server.mjs";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

//* Local imports
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";

//* Types imports
import type { World } from "@prisma/client";
import type { APIResponse } from "../../../types/api";

type APIRes = {
  imageUrl: string;
};

/**
 * This function is used to get the owner of the world
 */
const getOwner = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  const Response: APIResponse<APIRes> = {
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
    const { image } = req.body; // Get the image from the request body
    //this image comes from the client as a base64 string
    //we need to convert it to a blob
    const blob = await fetch(image).then((r) => r.blob());

    //verify if the image is valid
    if (!blob || blob.type !== "image/jpeg") {
      Response.errors?.push("Invalid image.");
      return res.json(Response);
    }

    //verify if there is a bucket of images
    const { data: bucket, error: bucketError } =
      await supabase.storage.listBuckets();

    console.log(bucket, bucketError);

    Response.status = "success";
    return res.json(Response);
  }
};

export default getOwner;
