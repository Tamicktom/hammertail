//* Libraries imports
import Image from "next/image";
import { Cake, Skull } from "@phosphor-icons/react";

//* Types imports
import type { Page, PageType } from "@prisma/client";

type Props = {
  page?: (Page & { PageType: PageType });
}

export const PageInfo = (props: Props) => {
  if (!props.page) return (<></>);

  return (
    <div className="p-2 w-80">
      {props.page.PageType.name === "characters" && <CharacterInfo />}
      {props.page.PageType.name === "places" && <PlaceInfo />}
      {props.page.PageType.name === "items" && <ItemInfo />}
      {props.page.PageType.name === "events" && <EventInfo />}
    </div>
  );
}

function CharacterInfo() {
  return (
    <>
      <div className='flex items-center justify-center w-full'>
        <Image
          src="https://i.pinimg.com/564x/bb/14/18/bb1418129cfc0b35f874d249bb5ff9e6.jpg"
          alt="Imagem do personagem"
          className="w-full rounded-lg"
          width={320}
          height={320}
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
    </>
  );
}
function ItemInfo() {
  return (
    <>
      <h2 className="text-white">Item</h2>
    </>
  );
}
function PlaceInfo() {
  return (
    <>
      <h2 className="text-white">Location</h2>
    </>
  );
}
function EventInfo() {
  return (
    <>
      <h2 className="text-white">Event</h2>
    </>
  );
}