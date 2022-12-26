//* Libraries imports
import { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from "../../server/db/client";
import type { GetServerSideProps } from "next";
import type { World } from "@prisma/client";

//* Components imports
import { WorldCard } from "../../components/WorldCard/WorldCard";

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

  const worlds = await prisma.world.findMany({
    where: {
      owner: {
        id: userId,
      },
    },
  });

  console.log(worlds);

  return {
    props: {
      worlds: JSON.parse(JSON.stringify(worlds)),
    },
  };
};

type WorldProps = {
  worlds: World[];
}

export default function Worlds({ worlds }: WorldProps) {
  const { data: session, status } = useSession();
  const [worldName, setWorldName] = useState("");

  return (
    <div className="w-screen h-screen flex">
      <h1>Worlds</h1>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="w-full h-1/6 flex  flex-col  justify-center items-center">
          <input
            className="border-2 border-black rounded-md"
            type="text"
            onChange={(e) => { setWorldName(e.target.value) }} />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => { createWorld(worldName) }}>
            <span>Criar um novo mundo</span>
          </button>
        </div>
        <div className="w-full h-5/6 flex flex-col justify-start items-center">
          <h3>Lista com os mundos de {session?.user?.name}</h3>
          <div className="w-full flex flex-row items-center justify-center flex-wrap">
            {worlds.map((world) => (
              <WorldCard key={world.id} world={world} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const createWorld = async (name: string) => {
  const body = {
    name
  }
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }

  const response = await fetch("/api/worlds", header);
  const data = await response.json();
  console.log(data);
}