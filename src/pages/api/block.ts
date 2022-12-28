import { type NextApiRequest, type NextApiResponse } from "next";
import sanitizeHtml from "sanitize-html";
import { prisma, supabase } from "../../server/db/client";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const block = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (session) {
    // const { id, blockContent } = req.body;
    // const sanitizedBlockContent = await sanitizeHtml(blockContent.content);
    // res.send(JSON.stringify({ id, sanitizedBlockContent, blockContent }));
    const { pageId, comand, type, blockId } = req.body;
    if (comand === "add") {
    }
    if (comand === "delete") {
    }
    if (comand === "update") {
    }
    if (comand === "get") {
      //get block from prisma
      const block = await prisma.block.findUnique({
        where: {
          id: blockId,
        },
      });

      //get block from supabase
      const { data, error } = await supabase.storage
        .from("pages")
        .download(`${pageId}/${blockId}.json`);
      if (error) {
        console.log(error);
      }

      //the block from supabase is a blob, so we need to convert it to json
      const blockJson = await data?.text();
      if (!blockJson) {
        return console.log("blockJson is undefined");
      }
      const blockJsonParsed = JSON.parse(blockJson);

      //return block
      console.log("block lido do supabase: ", blockJsonParsed);
      return res.send(JSON.stringify(blockJsonParsed));
    }
    if (comand === "create") {
      //create block on prisma
      const newBlock = await prisma.block.create({
        data: {
          path: "",
          pageId: pageId,
        },
      });

      //create block on supabase, inside pages bucket, inside pageId folder. If folder doesn't exist, create it.
      const { data, error } = await supabase.storage
        .from("pages")
        .upload(
          `${pageId}/${newBlock.id}.json`,
          JSON.stringify({ type: type, content: "" })
        );
      if (error) {
        console.log(error);
      }

      //update block on prisma with path
      const updatedBlock = await prisma.block.update({
        where: {
          id: newBlock.id,
        },
        data: {
          path: data?.path,
        },
      });

      //return updated block
      return res.send(JSON.stringify(updatedBlock));
    }
    res.send(JSON.stringify({ pageId, comand, type }));
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default block;
