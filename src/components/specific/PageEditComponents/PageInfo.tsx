//* Libraries imports
import Image from "next/image";
import { Cake, Skull } from "phosphor-react";

export const PageInfo = () => {
  return (
    <div className="p-2 w-60">
      <div className='flex items-center justify-center w-full'>
        <Image
          src="https://i.pinimg.com/564x/bb/14/18/bb1418129cfc0b35f874d249bb5ff9e6.jpg"
          alt="Imagem do personagem"
          className="w-full rounded-lg"
          width={100}
          height={100}
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCA"
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