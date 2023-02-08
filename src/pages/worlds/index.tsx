//* Libraries imports
import { useState } from "react";
import { getSession } from "next-auth/react";

//* Local imports
import { prisma } from "../../server/db/client";
import { parseWorlds } from "../../utils/parseWorld";

//* type imports
import type { GetServerSideProps } from "next";
import type { World } from "@prisma/client";

//* Components imports
import WorldCreationModal from "../../components/specific/WorldCreationModal/WorldCreationModal";
import WorldHeader from "../../components/specific/WorldHeader/WorldHeader";
import { WorldCard } from "../../components/specific/WorldCard/WorldCard";

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

  const worlds = await prisma.world.findMany({
    where: {
      owner: {
        id: userId, //* get worlds from user id
      },
    },
  });

  return {
    props: {
      worlds: JSON.parse(JSON.stringify(parseWorlds(worlds))),
    },
  };
};

//* Client side code -----------------------------------------------------------
type WorldProps = {
  worlds: World[];
}

export default function Worlds({ worlds }: WorldProps) {
  const [showModal, setShowModal] = useState(false); //* world creation modal
  const [filteredWorlds, setFilteredWorlds] = useState<World[]>(worlds);

  //* filter world list by name
  const handleWorldFilter = (filter: string) => {
    if (filter === "") return setFilteredWorlds(worlds);
    const filtered = worlds.filter((world) => {
      return world.name.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredWorlds(filtered);
  };

  return (
    <div className="relative flex flex-col w-screen min-h-screen bg-tertiary-800">
      <WorldCreationModal display={showModal} setDisplay={setShowModal} />
      <WorldHeader display={showModal} setDisplay={setShowModal} filterHandler={handleWorldFilter} />

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