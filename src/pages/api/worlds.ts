//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

//* Local imports
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";
import { supabase } from "../../server/db/client";
import { env } from "../../env/client.mjs";

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
    const worldData = z
      .object({
        name: z.string().min(3).max(255),
        startYear: z.number().min(0).max(999999),
        endYear: z.number().min(0).max(999999),
        description: z.string().max(512).optional(),
        image: z.boolean(),
        imageMimeType: z
          .enum(["image/png", "image/jpeg", "image/jpg", "image/gif", ""])
          .optional(),
      })
      .safeParse(req.body);

    if (!worldData.success) {
      return res.send({
        error: true,
        message: worldData.error,
      });
    }

    if (worldData.data.startYear > worldData.data.endYear) {
      return res.send({
        error: true,
        message: "The start year must be before the end year.",
      });
    }

    const world = await prisma.world.create({
      data: {
        name: worldData.data.name,
        start: worldData.data.startYear,
        end: worldData.data.endYear,
        description: worldData.data.description,
        owner: {
          connect: {
            id: sessionUserId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        start: true,
        end: true,
        description: true,
      },
    });

    if (!world) {
      return res.send({
        error: true,
        message: "Something went wrong.",
      });
    }

    if (!worldData.data.image) {
      return res.send({
        error: false,
        message: "World created successfully.",
        world,
      });
    }

    if (!worldData.data.imageMimeType) {
      return res.send({
        error: true,
        message:
          "World created successfully, but the image upload url failed. No image mime type was provided.",
      });
    }

    const extension = worldData.data.imageMimeType.split("/")[1];

    const url = `${sessionUserId}/${world.id}/world-image.${
      worldData.data.imageMimeType.split("/")[1]
    }`;
    const uploadLink = await supabase.storage
      .from("worlds")
      .createSignedUploadUrl(url);

    if (uploadLink.error) {
      return res.send({
        error: false,
        message: "World created successfully, but the image upload url failed.",
        world,
      });
    }

    res.send({
      uploadLink,
      world,
      error: false,
      message: "World created successfully.",
    });

    return await prisma.world.update({
      where: {
        id: world.id,
      },
      data: {
        image: `${env.NEXT_PUBLIC_SUPABASE_URL}storage/v1/object/public/worlds/${url}`,
      },
    });
  }

  return res.send({
    error: true,
    message: "This is the worlds page.",
  });
};

export default worlds;
