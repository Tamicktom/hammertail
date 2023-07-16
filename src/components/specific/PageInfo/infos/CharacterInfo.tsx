//* Libraries imports
import { useState, useEffect } from "react";
import Image from "next/image";
import { Cake, Skull } from "@phosphor-icons/react";
import { useRouter } from "next/router";

//* Hooks Imports
import usePage from "../../../../hooks/queries/usePage";
import useUpdatePageDate from "../../../../hooks/mutations/useUpdatePageDate";
import useDebounce from "../../../../hooks/common/useDebounce";

export default function CharacterInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className="">
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
        <div className='w-full'>
          <span className='text-lg font-bold text-white'>Mage of Cats</span>
        </div>
        <StartEndDate
          startDate={page.data?.start || 0}
          endDate={page.data?.end || 0}
        />
      </div>
    </div>
  );
}

type StartEndDateProps = {
  startDate: number;
  endDate: number;
}

function StartEndDate(props: StartEndDateProps) {
  const [pageDate, setPageDate] = useState({
    start: props.startDate,
    end: props.endDate
  });
  const debouncedStartDate = useDebounce(pageDate, 1200);

  const useUpdatePageDateMutation = useUpdatePageDate();

  useEffect(() => {
    useUpdatePageDateMutation.mutate({
      start: debouncedStartDate.start,
      end: debouncedStartDate.end
    })
  }, [debouncedStartDate]);

  return (
    <div className='flex flex-col w-full gap-2'>
      <div className='flex flex-row w-full gap-2'>
        <Cake size={24} className="text-white" />
        <input
          className='text-base text-neutral-950'
          defaultValue={props.startDate}
          onChange={(e) => setPageDate({ ...pageDate, start: parseInt(e.target.value) })}
        />
      </div>
      <div className='flex flex-row w-full gap-2'>
        <Skull size={24} className="text-white" />
        <input
          className='text-base text-neutral-950'
          defaultValue={props.endDate}
          onChange={(e) => setPageDate({ ...pageDate, end: parseInt(e.target.value) })}
        />
      </div>
    </div>
  );
}