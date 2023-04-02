//* Libraries imports
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

//* Type, styles, utils imports
import { contrast, arrayToRGBAString, getRGBAPalletteFromImage, type RGBA_String, type RGBA_Array } from "../../../utils/colorUtils";
import type { World } from "@prisma/client";

type WorldCardProps = {
  world: World;
  backgroundColor: [number, number, number];
}

export const WorldCard = ({ world, backgroundColor }: WorldCardProps) => {
  const [borderColor, setBorderColor] = useState<RGBA_String>("rgba(255, 255, 255, 0.3)");
  const image = world.image || "/images/default_world.jpg";

  useEffect(() => {
    getRGBAPalletteFromImage(image)?.then((color) => {
      const newColor: RGBA_Array = [...color];
      newColor[3] = 0.2;
      if (contrast(newColor, backgroundColor) > 5.5)
        setBorderColor(arrayToRGBAString(newColor));
    });
  }, []);

  return (
    <div
      className="flex flex-row items-center justify-center w-full h-24 my-2 overflow-hidden rounded-lg border-2"
      style={{ borderColor }}
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
        <Image
          alt="World Image"
          src={image}
          loading="lazy"
          width={256}
          height={256}
          className="w-24 h-24 rounded-lg"
        />
        <div className="w-full h-full px-2 py-1">
          <h1 className="text-xl font-bold text-white font-primary">{world.name}</h1>
          <p className="text-xs font-normal text-white/80 font-primary">
            {
              world.description ? world.description : "No description"
            }
          </p>
        </div>
      </Link>
    </div>
  );
};