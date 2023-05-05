import type { NextApiRequest, NextApiResponse } from "next";
import { prisma, supabase } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import z from "zod";

const block = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (session) {
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default block;
