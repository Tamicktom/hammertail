//* Libraries imports
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";

//* Type, styles, utils imports
import type { World } from "@prisma/client";

//* Components imports
import RainbowBorders from "../../common/RainbowBorders/RainbowBorders";

type WorldCardProps = {
  world: World;
}

export const WorldCard = ({ world }: WorldCardProps) => {
  const { data: session } = useSession();
  const [url, setUrl] = useState<string | null>(null);

  const handleImageError = () => {
    setUrl("/images/default_world.jpg");
  }

  return (
    <div className="flex items-center justify-center w-full max-w-lg">
      <RainbowBorders>
        <div className="w-full h-full overflow-hidden rounded-lg bg-neutral-950">
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
            {
              url
                ? <Image
                  alt="World Image"
                  src={url}
                  blurDataURL={url}
                  loading="lazy"
                  width={256}
                  height={256}
                  className="w-24 h-24 rounded-lg"
                />
                : <Image
                  alt="World Image"
                  src={
                    `https://cpjcjcsnbhpwvxnvtaba.supabase.co/storage/v1/object/public/worlds/${session?.user?.id}/${world.id}/world-image.png`
                  }
                  blurDataURL={
                    `https://cpjcjcsnbhpwvxnvtaba.supabase.co/storage/v1/object/public/worlds/${session?.user?.id}/${world.id}/world-image.png`
                  }
                  loading="lazy"
                  width={256}
                  height={256}
                  className="w-24 h-24 rounded-lg"
                  onError={handleImageError}
                />
            }
            <div className="flex flex-col items-start justify-start w-full h-24 px-4 py-2">
              <h1 className="text-xl font-bold text-white font-primary">{world.name}</h1>
              <p className="text-xs font-normal text-white/80 font-primary">
                {
                  world.description || "No description"
                }
              </p>
            </div>
          </Link>
        </div>
      </RainbowBorders>
    </div>
  );
};