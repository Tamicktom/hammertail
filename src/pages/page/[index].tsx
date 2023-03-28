//* Libraries imports
import { getSession } from "next-auth/react";
import { prisma } from "../../server/db/client";
import type { GetServerSideProps } from "next";
import type { Page, Block, World } from "@prisma/client";

//* Component imports
import PageEdit from "../../layouts/PageEdit/PageEdit";

import { parseWorld } from "../../utils/parseWorld";

//* Server side code ----------------------------------------------------------
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //if the user is not logged in, redirect to the login page
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  // get the page id from url
  const pageId = ctx?.query.index;

  // get the user id from the session
  const userId = session?.user?.id;

  const page = await prisma.page.findUnique({
    where: {
      id: JSON.parse(JSON.stringify(pageId)),
    },
    include: {
      world: true,
    },
  });

  //if the page doesn't exist or the user is not the owner of the world
  if (page?.world.ownerId !== userId) {
    return {
      redirect: {
        destination: "/worlds",
        permanent: false,
      },
    };
  }

  if (page?.world) {
    page.world = JSON.parse(JSON.stringify(parseWorld(page.world)));
  }

  //get blocks from the page
  const blocks = await prisma.block.findMany({
    where: {
      pageId: JSON.parse(JSON.stringify(pageId)),
    },
  });

  //get the world of the page
  const world = await prisma.world.findUnique({
    where: {
      id: page?.world.id,
    },
  });

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      blocks: JSON.parse(JSON.stringify(blocks)),
      world: JSON.parse(JSON.stringify(world)),
    },
  };
};

//* Client side code ----------------------------------------------------------
type Props = {
  world: World;
  page: Page;
  blocks: Block[];
}

export default function Page(props: Props) {
  return (
    <PageEdit
      worldId={props.world.id}
      page={props.page}
      blocks={props.blocks}
    />
  );
}
