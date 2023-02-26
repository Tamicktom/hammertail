//* Libraries imports
import { useState, useEffect } from 'react';
import { getSession } from "next-auth/react";

//* Local imports
import { prisma } from "../../server/db/client";
import { parseWorlds } from "../../utils/parseWorld";

//* type imports
import type { GetServerSideProps } from "next";
import type { World } from "@prisma/client";

//* Components imports
import WorldHeader from "../../components/specific/WorldHeader/WorldHeader";
import { WorldCard } from "../../components/specific/WorldCard/WorldCard";

//* Hooks imports
import { useWorldList } from "../../hooks/specific/useWorldList";

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
  const { error, loading, worlds } = useWorldList(userId);
  const [filteredWorlds, setFilteredWorlds] = useState<World[]>([]);

  //* filter world list by name
  const handleWorldFilter = (filter: string) => {
    if (filter === "") return setFilteredWorlds(worlds);
    const filtered = worlds.filter((world) => {
      return world.name.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredWorlds(filtered);
  };

  useEffect(() => {
    setFilteredWorlds(worlds);
  }, [worlds]);

  return (
    <div className="relative flex flex-col w-screen min-h-screen bg-tertiary-800">
      <WorldHeader filterHandler={handleWorldFilter} />
      {/* worldsCards */}
      <div className="flex flex-col items-center justify-start w-full p-4">
        <div className="flex flex-col items-center justify-start w-full max-w-lg">
          {filteredWorlds.map((world) => (
            <WorldCard key={world.id} world={world} />
          ))}
        </div>
      </div>
    </div>
  );
}