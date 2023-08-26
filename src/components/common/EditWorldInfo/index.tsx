//* Libraries imports
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";

//* Component imports

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";
import Image from "next/image";

export default function EditWorldInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  if (page.isLoading) return (
    <div>
      <div className="flex items-center justify-center w-20 h-20 overflow-hidden transition-all ease-in xl:w-12 xl:h-12">
        <div
          className="object-cover w-full h-full rounded-lg bg-gradient-to-b dark:from-primary-600 dark:to-primary-800 from-primary-300 to-primary-600 animate-pulse"
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-center w-20 h-20 hover:shadow-lg overflow-hidden xl:w-12 xl:h-12">
        <Image
          className="object-cover w-full h-full rounded-lg"
          src={page.data?.world?.image || "/images/default_world_image.svg"}
          alt="world image"
          priority
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}