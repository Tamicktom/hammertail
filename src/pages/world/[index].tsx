//* Libraries imports
import Link from "next/link";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { MagnifyingGlass } from "phosphor-react";
import type { GetServerSideProps } from "next";

//* Utils imports
import type { World, Page } from "@prisma/client";
import { prisma } from "../../server/db/client";
import { parseWorld } from "../../utils/parseWorld";

//* Components imports
import PageCreationModal from "../../components/specific/PageCreationModal/PageCreationModal";
import WorldHeader from "../../components/specific/WorldHeader/WorldHeader";

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

  const filterHandler = (filter: string) => { };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-tertiary-800 font-primary">
      <WorldHeader filterHandler={filterHandler} />

      <div className="w-full max-w-7xl flex flex-row justify-center items-center h-full gap-4 p-4">
        <PageList
          content="characters"
          worldId={props.world.id}
        />
        <PageList
          content="places"
          worldId={props.world.id}
        />
        <PageList
          content="items"
          worldId={props.world.id}
        />
        <PageList
          content="events"
          worldId={props.world.id}
        />
      </div>
    </div>
  )
}

type PageTypes = "characters" | "places" | "items" | "events";

type ApiPageListing = {
  listing: PageTypes;
  pages: Page[];
}
type PageListProps = {
  content: PageTypes;
  worldId: string;
}

function PageList(props: PageListProps) {
  const title = props.content.charAt(0).toUpperCase() + props.content.slice(1);
  const [data, setData] = useState<ApiPageListing | null>(null);

  useEffect(() => {
    getPagesByType(props.worldId, props.content)
      .then(res => setData(res))
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center border-2 border-tertiary-600 rounded-lg">
      <div>{title}</div>
      <div>
        {
          data?.pages?.map(page => (
            <div key={page.id}>
              <Link href={`/page/${page.id}`}>
                <span>{page.name}</span>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}

async function getPagesByType(worldId: string, pageType: PageTypes) {
  const body = {
    worldId,
    listing: pageType,
    action: "ListPages"
  }

  const res = await fetch("/api/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);
  return data as ApiPageListing;
}