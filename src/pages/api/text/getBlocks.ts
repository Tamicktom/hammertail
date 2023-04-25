import { type NextApiRequest, type NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma, supabase } from "../../../server/db/client";
import z from "zod";

const getBlocks = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  //verify if the user is logged in
  if (!session) {
    return res.send({
      content: "Login to view the protected content on this page.",
    });
  }

  //verify the request method
  if (req.method !== "POST") {
    return res.send({
      content: "Invalid request method",
    });
  }

  //grab the pageId from the request body
  const { pageId } = req.body;

  //verify the pageId
  const pageIdSchema = z.string();

  try {
    pageIdSchema.parse(pageId);
  } catch (error) {
    return res.send({
      content: "Invalid pageId",
    });
  }

  //grab the page content from the supabase storage


  return res.send({
  });
};

export default getBlocks;
