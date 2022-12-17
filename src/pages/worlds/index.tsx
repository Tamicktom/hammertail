//* Libraries imports
import { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from "../../server/db/client";
import type { GetServerSideProps } from "next";
import type { World } from "@prisma/client";

//* Components imports

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
    <div>
      <h1>Worlds</h1>
      <div>
        <input type="text" onChange={(e) => { setWorldName(e.target.value) }} />
        <button onClick={() => { createWorld(worldName) }}>
          <span>Criar um novo mundo</span>
        </button>
        <div>
          <h3>Lista com os mundos de {session?.user?.name}</h3>
          <div>
            {worlds.map((world) => (
              <div key={world.id}>
                <h4>{world.name}</h4>
              </div>
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