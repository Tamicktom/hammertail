//* Libraries imports
import Link from "next/link";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { prisma } from "../../server/db/client";
import type { GetServerSideProps } from "next";
import type { World, Page } from "@prisma/client";
import { parseWorld } from "../../utils/parseWorld";

//* Server side ----------------------------------------------
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

  //get world id from url
  const id = ctx?.query.index;

  //get world from db  where id = id and ownerId = userId
  const world = await prisma.world.findUnique({
    where: {
      id: JSON.parse(JSON.stringify(id)),
    },
    include: {
      owner: true,
    },
  });

  //verify if user is owner of world
  if (world?.owner.id !== userId) {
    return {
      redirect: {
        destination: "/worlds",
        permanent: false,
      },
    };
  }

  const pages = await prisma.page.findMany({
    where: {
      worldId: JSON.parse(JSON.stringify(id)),
    },
  });

  console.log(world);

  return {
    props: {
      world: JSON.parse(JSON.stringify(parseWorld(world as World))),
      pages: JSON.parse(JSON.stringify(pages)),
    },
  };
};

//* Client side ----------------------------------------------
type Props = {
  world: World;
  pages: Page[];
}
export default function World({ world, pages }: Props) {
  const [newPageName, setNewPageName] = useState("");

  const handleAddPage = async () => {
    const response = await fetch("/api/pages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newPageName, worldId: world.id }),
    })
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div>
        <h1>{world.name}</h1>
        <div className="flex flex-col justify-center items-center">
          <p>Criar nova página:</p>
          <input
            onChange={(e) => setNewPageName(e.target.value)}
            className="border-2 border-black rounded-md"
            type="text" />
          <button
            onClick={handleAddPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >Adicionar</button>
        </div>
      </div>


      <div className="bg-green-200 flex flex-col justify-center items-center">
        <h2>Pages</h2>
        {
          pages?.map((page) => {
            return (
              <div key={page.id}>
                <Link href={{
                  pathname: `/page/${page.id}`,
                  query: {
                    worldId: world.id,
                    pageId: page.id,
                  },
                }}>
                  <h3>{page.name}</h3>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}