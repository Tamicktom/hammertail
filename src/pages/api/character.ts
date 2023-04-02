//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

//* Server imports
import { prisma, supabase } from "../../server/db/client";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default async function block(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (session) {
    if (!req.method) return res.send({ error: "method not found" });

    const schema = z.object({
      pageId: z.string(),
      
    });

    if (req.method === "GET") {
    }
    if (req.method === "POST") {
    }
    if (req.method === "PATCH") {
    }
    if (req.method === "PUT") {
    }
    if (req.method === "DELETE") {
    }
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}