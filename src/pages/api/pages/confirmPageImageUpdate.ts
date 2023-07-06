//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

//* Local imports
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";
import { supabase } from "../../../server/db/client";
import { env } from "../../../env/client.mjs";

const pageImageUploadSchema = z.object({
  worldId: z.string().uuid(),
  pageId: z.string().uuid(),
  image: z.enum(["image/png", "image/jpeg", "image/jpg", "image/gif"]),
});

const worlds = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  //verify if the user is logged in
  if (!session) {
    return res.send({
      error: true,
      message: "Login to view the protected content on this page.",
    });
  }

  const sessionUserId = session?.user?.id;

  if (!sessionUserId) {
    return res.send({
      error: true,
      message: "Login to view the protected content on this page.",
    });
  }

  //verify if is a Post request
  if (req.method === "POST") {
    const parsedImageUpload = pageImageUploadSchema.safeParse(req.body);

    if (!parsedImageUpload.success) {
      return res.send({
        error: true,
        message: "Invalid data.",
      });
    }

    const { worldId, pageId, image } = parsedImageUpload.data;

    const imageExtension = image.split("/")[1];

    const page = await prisma.page.update({
      where: {
        id: pageId,
      },
      data: {
        image: `${env.NEXT_PUBLIC_SUPABASE_URL}storage/v1/object/public/pages-images/${sessionUserId}/${worldId}/${pageId}/background.${imageExtension}`,
      },
    });

    if (!page) {
      return res.send({
        error: true,
        message: "Invalid page.",
      });
    }

    return res.send({
      error: false,
      message: "Page image updated.",
    });
  }

  return res.send({
    error: true,
    message: "This is the worlds page.",
  });
};

export default worlds;
