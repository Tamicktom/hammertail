//* Libraries imports
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

//* Type, styles, utils imports
import { contrast, arrayToRGBString, getRGBPalletteFromImage, type RGB } from "../../../utils/colorUtils";
import type { World } from "@prisma/client";

type WorldCardProps = {
  world: World;
  backgroundColor: [number, number, number];
}

export const WorldCard = ({ world, backgroundColor }: WorldCardProps) => {
  const [borderColor, setBorderColor] = useState<RGB>("rgb(255, 255, 255)");

  useEffect(() => {
    const image = `https://picsum.photos/200`;
    getRGBPalletteFromImage(image)?.then((color) => {
      const colorContrast = contrast(color, backgroundColor);
      if (colorContrast > 4.5)
        setBorderColor(arrayToRGBString(color));
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
          src='https://picsum.photos/200'
          loading="eager"
          width={96}
          height={96}
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