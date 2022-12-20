//* Libraries imports
import type { World } from "@prisma/client"

type WorldCardProps = {
  world: World;
}

export const WorldCard = ({ world }: WorldCardProps) => {
  return (
    <div className="w-72 h-80">
      <h3>{world.name}</h3>
    </div>
  );
};
