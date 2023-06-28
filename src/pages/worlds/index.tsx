//* Libraries imports
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSession } from "next-auth/react";

//* type imports
import type { World } from "@prisma/client";

//* Components imports
import WorldHeader from "../../components/specific/WorldsHeader/WorldsHeader";
import { WorldCard } from "../../components/specific/WorldCard/WorldCard";
import LocalLoading from "../../components/common/LocalLoading/LocalLoading";

//* Hooks imports
import { useWorldList } from "../../hooks/specific/useWorldList";

//* Store imports
import worldStore from "../../store/common/world";


export default function Worlds() {
  const { data: session } = useSession();
  const { loading } = useWorldList(session?.user?.id || "");
  const [filteredWorlds, setFilteredWorlds] = useState<World[]>([]);

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

  return (
    <>
      <Head>
        <title>Worlds</title>
        <meta name="description" content="The Worldbuilding tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex flex-col w-screen min-h-screen bg-left-top bg-repeat bg-noise bg-neutral-950 bg-30 md:bg-20 lg:bg-10">
        <WorldHeader filterHandler={handleWorldFilter} />

        {/* worldsCards */}
        {
          loading
            ? <LocalLoading />
            : <div className="flex flex-col items-center justify-start w-full p-4">
              <div className="flex flex-col items-center justify-start w-full max-w-lg gap-4">
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