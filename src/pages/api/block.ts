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
    const { pageId, comand, blockType, blockId, content } = req.body;
    if (comand === "add") {
    }
    if (comand === "delete") {
    }
    if (comand === "update") {
      //verify if block exists on prisma
      const block = await prisma.block.findUnique({
        where: {
          id: blockId,
        },
        include: {
          page: true,
        },
      });
      if (!block) {
        console.log("block not found");
        return res.send(JSON.stringify({ error: "block not found" }));
      }

      //update block on supabase
      const { data, error } = await supabase.storage.from("pages").update(
        `${pageId}/${blockId}.json`,
        JSON.stringify({
          id: blockId,
          content: content,
          blockType: blockType,
        })
      );
      if (error) {
        console.log(error);
        return res.send(JSON.stringify({ error: error }));
      }

      console.log(
        "block updated on supabase --------------------------------------------"
      );
      return res.send(
        JSON.stringify({ data: data, mensage: "block updated", id: blockId })
      );
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
          blockType: "p",
        },
      });

      //create block on supabase, inside pages bucket, inside pageId folder. If folder doesn't exist, create it.
      const { data, error } = await supabase.storage
        .from("pages")
        .upload(
          `${pageId}/${newBlock.id}.json`,
          JSON.stringify({ id: newBlock.id, content: "", blockType: "p" })
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
    res.send(JSON.stringify({ pageId, comand, blockType }));
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default block;
