//* Libraries imports
import Link from "next/link";
import type { World } from "@prisma/client";

type WorldCardProps = {
  world: World;
}

export const WorldCard = ({ world }: WorldCardProps) => {
  return (
    <div className="w-72 h-80 bg-yellow-300 border-black border-2">
      <h3>{world.name}</h3>
      <Link href={{
        pathname: "/world/[index]",
        query: {
          index: world.id,
          name: world.name
        },
      }}
        as={`/world/${world.id}`}
      >
        <button>
          Go to world
        </button>
      </Link>
    </div>
  );
};
