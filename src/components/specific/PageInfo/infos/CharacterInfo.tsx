//* Libraries imports
import Image from "next/image";
import { useRouter } from "next/router";

//* Components imports
import StartEndDate from "../../../specific/StartEndDate";

//* Hooks Imports
import usePage from "../../../../hooks/queries/usePage";

export default function CharacterInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className='flex items-center justify-center w-full'>
        <Image
          src="https://th.bing.com/th/id/OIP.t3SF3TpmOxVWm-e-QnojAQHaLH?pid=ImgDet&rs=1"
          alt="Imagem do personagem"
          className="w-80 rounded-lg border border-neutral-700"
          width={320}
          height={320}
          priority
          placeholder="blur"
          blurDataURL="https://i.pinimg.com/564x/bb/14/18/bb1418129cfc0b35f874d249bb5ff9e6.jpg"
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <StartEndDate
          pageId={page.data?.id || ""}
          startDate={page.data?.start || 0}
          endDate={page.data?.end || 0}
          page={page.data}
        />
      </div>
    </div>
  );
}

