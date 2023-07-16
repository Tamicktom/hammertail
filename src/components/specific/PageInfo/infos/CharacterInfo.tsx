//* Libraries imports
import Image from "next/image";
import { Cake, Skull } from "@phosphor-icons/react";

export default function CharacterInfo() {
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
        <div className='flex flex-col w-full gap-2'>
          <div className='flex flex-row w-full gap-2'>
            <Cake size={24} className="text-white" />
            <span className='text-base text-white'>12/02/3652</span>
          </div>
          <div className='flex flex-row w-full gap-2'>
            <Skull size={24} className="text-white" />
            <span className='text-base text-white'>31/09/3698</span>
          </div>
        </div>
      </div>
    </div>
  );
}