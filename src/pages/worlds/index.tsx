//* Libraries imports
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { getSession } from "next-auth/react";

//* type imports
import type { GetServerSideProps } from "next";
import type { World } from "@prisma/client";

//* Components imports
import WorldHeader from "../../components/specific/WorldsHeader/WorldsHeader";
import { WorldCard } from "../../components/specific/WorldCard/WorldCard";
import LocalLoading from "../../components/common/LocalLoading/LocalLoading";

//* Hooks imports
import { useWorldList } from "../../hooks/specific/useWorldList";

//* Store imports
import worldStore from "../../store/common/world";

//* Server side code -----------------------------------------------------------
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) { //* if user is not logged in, redirect to login page
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const userId = session?.user?.id; //* get user id from session

  return {
    props: {
      userId
    },
  };
};

//* Client side code -----------------------------------------------------------

type WorldsProps = {
  userId: string;
}

export default function Worlds({ userId }: WorldsProps) {
  const { loading } = useWorldList(userId);
  const [filteredWorlds, setFilteredWorlds] = useState<World[]>([]);
  const divHolder = useRef<HTMLDivElement>(null);
  const [bgColor, setBgColor] = useState<[number, number, number]>([0, 0, 0]);

  const worldList = worldStore((state) => state.worlds);

  //* filter world list by name
  const handleWorldFilter = (filter: string) => {
    if (filter === "") return setFilteredWorlds(worldList);
    const filtered = worldList.filter((world) => {
      return world.name.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredWorlds(filtered);
  };

  useEffect(() => {
    setFilteredWorlds(worldList);
  }, [worldList]);

  useEffect(() => {
    //get the computed bg color of the div
    if (divHolder?.current) {
      const computedBgColor = window.getComputedStyle(divHolder.current).backgroundColor;
      //convert the rgb string to an array of numbers
      const rgb = computedBgColor.replace(/[^\d,]/g, '').split(',').map(Number);
      if (typeof rgb[0] === "number" && typeof rgb[1] === "number" && typeof rgb[2] === "number") {
        setBgColor(rgb as [number, number, number]);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Worlds</title>
        <meta name="description" content="The Worldbuilding tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        ref={divHolder}
        className="relative flex flex-col w-screen min-h-screen bg-left-top bg-repeat bg-noise bg-neutral-950 bg-30 md:bg-20 lg:bg-10"
      >
        <WorldHeader filterHandler={handleWorldFilter} />

        {/* worldsCards */}
        {
          loading
            ? <LocalLoading />
            : <div className="flex flex-col items-center justify-start w-full p-4">
              <div className="flex flex-col items-center justify-start w-full max-w-lg">
                {
                  filteredWorlds?.map((world, index) => (
                    <WorldCard
                      key={world.id}
                      world={world}
                    />
                  ))
                }
              </div>
            </div>
        }
      </div>
    </>
  );
}