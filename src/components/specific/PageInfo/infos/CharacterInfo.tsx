//* Libraries imports
import Image from "next/image";
import { useRouter } from "next/router";

//* Components imports
import PageInfoImage from "../../PageInfoImage";
import StartEndDate from "../../../specific/StartEndDate";

//* Hooks Imports
import usePage from "../../../../hooks/queries/usePage";

const characterItems = [
  {
    id: "1",
    name: "Sword",
    image: "/images/sword.png",
    description: "A sword that is used to kill people.",
    start: 0,
    end: 20,
  },
  {
    id: "2",
    name: "Shield",
    image: "/images/shield.png",
    description: "A shield that is used to protect people.",
    start: 0,
    end: 20,
  }
]

const characterEvents = [
  {
    id: "1",
    name: "The battle of the 5 armies",
    image: "/images/battle.png",
    description: "A battle that is used to kill people.",
    start: 0,
    end: 20,
  },
  {
    id: "2",
    name: "The battle of the 5 armies",
    image: "/images/battle.png",
    description: "A battle that is used to kill people.",
    start: 0,
    end: 20,
  }
]

const characterPlaces = [
  {
    id: "1",
    name: "Okami's house",
    image: "/images/house.png",
    description: "His house.",
    start: 0,
    end: 20,
  },
  {
    id: "2",
    name: "Okami's house",
    image: "/images/house.png",
    description: "His house.",
    start: 0,
    end: 20,
  }
]

export default function CharacterInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <div className='flex items-center justify-center w-full'>
        <PageInfoImage
          page={page.data}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <StartEndDate
          loading={page.isLoading || page.isFetching}
          pageId={page.data?.id || ""}
          startDate={page.data?.start || 0}
          endDate={page.data?.end || 0}
          page={page.data}
        />

        <div className="flex flex-col w-full">
          <span className='text-white'>Inventory</span>
          <span className="text-white">Items that this character has.</span>
          <ul>
            {characterItems.map((item) => (
              <li key={item.id} className='flex flex-row items-center justify-start w-full gap-2'>
                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-neutral-700'>
                  {/* <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                  /> */}
                </div>
                <div className='flex flex-col items-start justify-center w-full gap-1'>
                  <span className='text-white'>{item.name}</span>
                  <span className='text-neutral-200'>{item.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col w-full">
          <span className='text-white'>Events</span>
          <span className="text-white">Events that this character is involved.</span>
          <ul>
            {characterEvents.map((event) => (
              <li key={event.id} className='flex flex-row items-center justify-start w-full gap-2'>
                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-neutral-700'>
                  {/* <Image
                    src={event.image}
                    alt={event.name}
                    width={48}
                    height={48}
                  /> */}
                </div>
                <div className='flex flex-col items-start justify-center w-full gap-1'>
                  <span className='text-white'>{event.name}</span>
                  <span className='text-neutral-200'>{event.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col w-full">
          <span className='text-white'>Places</span>
          <span className="text-white">Places that this character is involved.</span>
          <ul>
            {characterPlaces.map((place) => (
              <li key={place.id} className='flex flex-row items-center justify-start w-full gap-2'>
                <div className='flex items-center justify-center w-12 h-12 rounded-full bg-neutral-700'>
                  {/* <Image
                    src={place.image}
                    alt={place.name}
                    width={48}
                    height={48}
                  /> */}
                </div>
                <div className='flex flex-col items-start justify-center w-full gap-1'>
                  <span className='text-white'>{place.name}</span>
                  <span className='text-neutral-200'>{place.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
