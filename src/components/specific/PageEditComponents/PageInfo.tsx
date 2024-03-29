//* Libraries imports
import Image from "next/image";
import { Cake, Skull } from "@phosphor-icons/react";
import { useRouter } from "next/router";

//* Types imports
import type { Page, PageType } from "@prisma/client";

//* Component imports
import LocalLoading from "../../common/LocalLoading/LocalLoading";

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";


export default function PageInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  if (page.isLoading) return <LocalLoading />

  return (
    <div className="p-2 w-80">
      {renderRightInfo(page.data?.PageType)}
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

function renderRightInfo(type: PageType | null | undefined) {
  if (!type) return <NoPageType />
  if (type.name === "characters") return <CharacterInfo />
  if (type.name === "places") return <PlaceInfo />
  if (type.name === "items") return <ItemInfo />
  if (type.name === "events") return <EventInfo />
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
function NoPageType() {
  return (
    <>
      <h2 className="text-white">No page type</h2>
    </>
  );
}