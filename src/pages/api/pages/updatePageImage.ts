//* Libraries imports
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

//* Local imports
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { supabase } from "../../../server/db/client";

const pageImageUploadSchema = z.object({
  worldId: z.string().uuid({ message: "Invalid world id." }),
  pageId: z.string().uuid({ message: "Invalid page id." }),
  image: z.enum(["image/png", "image/jpeg", "image/jpg", "image/gif"], {
    description: "Image type",
    required_error: "Image type is required.",
    invalid_type_error:
      "Invalid file type. Please upload a PNG, JPEG, JPG or GIF file.",
  }),
});

const worlds = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  //verify if the user is logged in
  if (!session) {
    return res.status(401).send({
      error: true,
      message: "Login to view the protected content on this page.",
    });
  }

  const sessionUserId = session?.user?.id;

  if (!sessionUserId) {
    return res.status(401).send({
      error: true,
      message: "Login to view the protected content on this page.",
    });
  }

  //verify if is a Post request
  if (req.method === "POST") {
    const parsedImageUpload = pageImageUploadSchema.safeParse(req.body);

    if (!parsedImageUpload.success) {
      // concat all the error messages
      const errorMessage = parsedImageUpload.error.issues;
      const errorMessageString = errorMessage.map((error) => error.message);
      return res.status(400).send({
        error: true,
        message: errorMessageString,
      });
    }

    const { worldId, pageId, image } = parsedImageUpload.data;

    const imageExtension = image.split("/")[1];

    if (!imageExtension) {
      return res.status(400).send({
        error: true,
        message: "Invalid image. Please upload a valid image.",
      });
    }

    const url = `${sessionUserId}/${worldId}/${pageId}/background.${imageExtension}`;
    const uploadLink = await supabase.storage
      .from("pages-images")
      .createSignedUploadUrl(url);

    if (uploadLink.error) {
      return res.status(500).send({
        error: true,
        message: "Internal server error. Please try again later.",
      });
    }

    return res.status(200).send({
      error: false,
      message: "Upload link created.",
      uploadLink,
    });
  }

  return res.status(405).send({
    error: true,
    message: "Wrong request method.",
  });
};

export default worlds;
