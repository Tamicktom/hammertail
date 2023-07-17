//* Libraries imports
import { useState } from "react";
import { getSession } from "next-auth/react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
// import dynamic from "next/dynamic";

//* Utils imports
import type { World } from "@prisma/client";
import { prisma } from "../../server/db/client";
import { parseWorld } from "../../utils/parseWorld";

//* Components imports
import WorldHeader from "../../components/specific/WorldHeader/WorldHeader";
import PageList from "../../components/specific/PageList/PageList";
// const WorldHeader = dynamic(() => import("../../components/specific/WorldHeader/WorldHeader"), {
//   loading: () => <div className="w-full h-[200px] flex flex-col  justify-center items-center gap-4 p-4" />,
// });
// const PageList = dynamic(() => import("../../components/specific/PageList/PageList"), {
//   loading: () => <div className="w-full h-full flex flex-col justify-start items-center border-2 border-tertiary-700 rounded-lg overflow-hidden" />,
// });

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

  return {
    props: {
      world: JSON.parse(JSON.stringify(parseWorld(world as World))),
    },
  };
};

//* Client side ----------------------------------------------
type Props = {
  world: World;
}

//* Client side ----------------------------------------------
export default function World(props: Props) {
  const [filterWord, setFilterWord] = useState<string>("");

  const filterHandler = (filter: string) => {
    setFilterWord(filter);
  };

  return (
    <>
      <Head>
        <title>{props.world.name}</title>
      </Head>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-neutral-800 font-primary">
        <WorldHeader
          filterHandler={filterHandler}
          world={props.world}
        />
        <div className="w-full max-w-7xl flex flex-row justify-center items-center h-full gap-4 p-4">
          <PageList
            content="characters"
            worldId={props.world.id}
            filterWord={filterWord}
          />
          <PageList
            content="places"
            worldId={props.world.id}
            filterWord={filterWord}
          />
          <PageList
            content="items"
            worldId={props.world.id}
            filterWord={filterWord}
          />
          <PageList
            content="events"
            worldId={props.world.id}
            filterWord={filterWord}
          />
          <PageList
            content="undefined"
            worldId={props.world.id}
            filterWord={filterWord}
          />
        </div>
      </div>
    </>
  )
}

