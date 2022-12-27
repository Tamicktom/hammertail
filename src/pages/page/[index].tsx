//* Libraries imports
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from "../../server/db/client";
import type { GetServerSideProps } from "next";
import type { World, Page } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const userId = session?.user?.id;
  const { pageId, worldId, index } = ctx?.query;

  const page = await prisma.page.findUnique({
    where: {
      id: JSON.parse(JSON.stringify(pageId)),
    },
    include: {
      world: true,
    },
  });

  if (page?.world.ownerId !== userId) {
    return {
      redirect: {
        destination: "/worlds",
        permanent: false,
      },
    };
  }

  console.log("--------------------");
  console.log(page);

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
    },
  };
};

type Props = {
  page: Page;
}

export default function World({ page }: Props) {


  return (
    <div>
      <h1>{page.name}</h1>
    </div>
  );
}