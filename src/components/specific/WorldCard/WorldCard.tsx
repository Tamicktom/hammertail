//* Libraries imports
import Link from "next/link";
import { useState } from "react";

//* Type, styles, utils imports
import type { World } from "@prisma/client";
import colorPirate from "../../../utils/getPallet";

type WorldCardProps = {
  world: World;
}

export const WorldCard = ({ world }: WorldCardProps) => {
  const [color, setColor] = useState<string>('white');
  const generateColor = async () => {
    const color = new colorPirate('https://picsum.photos/200');
    const colorHex = await color.getRGBPalletColors();
    if (colorHex) setColor(colorHex[0] || "black");
  }

  generateColor();

  return (
    <div
      style={{ borderColor: color }}
      className="flex flex-row items-center justify-center w-full h-24 my-2 overflow-hidden rounded-lg border-2"
    >
      <Link href={{
        pathname: "/world/[index]",
        query: {
          index: world.id,
          name: world.name
        },
      }}
        as={`/world/${world.id}`}
        className="flex flex-row items-center justify-center w-full h-full"
      >
        <img
          alt="World Image"
          src='https://picsum.photos/200'
          loading="lazy"
          className="w-24 h-24 rounded-lg"
        />
        <div className="w-full h-full px-2 py-1">
          <h1 className="text-xl font-bold text-white">{world.name}</h1>
          <p className="text-xs font-normal text-white/80">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde at totam repellat. Dolore, possimus sequi ad nobis itaque ratione rem minus impedit quaerat molestiae cum id aspernatur alias soluta! Aliquid!</p>
        </div>
      </Link>
    </div>
  );
};
