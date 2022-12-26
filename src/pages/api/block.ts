import { type NextApiRequest, type NextApiResponse } from "next";
import sanitizeHtml from "sanitize-html";

import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const block = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  console.info("Saving block----------------------------------");
  if (session) {
    const { id, blockContent } = req.body;
    const sanitizedBlockContent = await sanitizeHtml(blockContent.content);
    res.send(JSON.stringify({ id, sanitizedBlockContent, blockContent }));
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};

export default block;
