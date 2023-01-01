import { type NextApiRequest, type NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

import { prisma } from "../../server/db/client";

import { env } from "../../env/server.mjs";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const teste: any = req.body;
  
  const { data, error } = await supabase.storage
    .from("blocks")
    .upload(teste.title + ".json" , JSON.stringify(teste));

  res.status(200).json({ data, error });
};

export default examples;
