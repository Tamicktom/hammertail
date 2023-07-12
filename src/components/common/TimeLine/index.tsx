//* Libraries imports
import { useState } from "react";
import { useRouter } from "next/router";
import { Person } from "@phosphor-icons/react";
import Link from "next/link";

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";
import useDebounce from "../../../hooks/common/useDebounce";

type TimelineEvents = {
  category: "character" | "location" | "item" | "event";
  markers: {
    id: string;
    title: string;
    startTimestamp: number;
    endTimestamp: number;
  }[];
}

type TimelineData = {
  character: TimelineEvents;
  location: TimelineEvents;
  item: TimelineEvents;
  event: TimelineEvents;
  totalDuration: number;
}

const timelineData: TimelineData = {
  character: {
    category: "character",
    markers: [{
      id: "1",
      title: "Character 1",
      startTimestamp: 0,
      endTimestamp: 10,
    }, {
      id: "2",
      title: "Character 2",
      startTimestamp: 20,
      endTimestamp: 40,
    }, {
      id: "3",
      title: "Character 3",
      startTimestamp: 60,
      endTimestamp: 90,
    }]
  },
  location: {
    category: "location",
    markers: [{
      id: "1",
      title: "Location 1",
      startTimestamp: 40,
      endTimestamp: 95,
    }]
  },
  item: {
    category: "item",
    markers: [{
      id: "1",
      title: "Item 1",
      startTimestamp: 10,
      endTimestamp: 30,
    }, {
      id: "2",
      title: "Item 2",
      startTimestamp: 50,
      endTimestamp: 70,
    }]
  },
  event: {
    category: "event",
    markers: [{
      id: "1",
      title: "Event 1",
      startTimestamp: 2,
      endTimestamp: 45,
    }, {
      id: "2",
      title: "Event 2",
      startTimestamp: 30,
      endTimestamp: 60,
    }]
  },
  totalDuration: 100,
}

type TimelineProps = {}

export default function TimeLine(props: TimelineProps) {
  const [isOpen, setIsOpen] = useState(true);
  const debouncedIsOpen = useDebounce(isOpen, 150);

  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div
      className='flex flex-col justify-center items-center w-full sticky left-0 bottom-0 z-10 transition-all'
      style={{
        height: isOpen ? "auto" : "40px",
      }}
    >
      <div
        className="w-full"
        style={{
          height: isOpen ? "40px" : "100%",
        }}
      >
        <button
          className='p-2 bg-neutral-800 rounded-t-lg flex flex-row gap-4 ml-8 text-neutral-100 px-4'
          onClick={() => setIsOpen(!isOpen)}
        >
          {debouncedIsOpen ? "Close Timeline" : "Open Timeline"}
        </button>
      </div>
      <div
        className="w-full h-full transition-all overflow-hidden"
        style={{
          height: isOpen ? "100%" : "0px",
          opacity: debouncedIsOpen ? 1 : 0,
        }}
      >
        <div className='w-full h-full bg-red-600 flex flex-row justify-start items-start overflow-auto'>
          {/* Timeline left side */}
          <div className="w-64 h-fit bg-green-600 flex flex-col">
            {/* <div className="w-full h-10 border-b border-neutral-700" /> */}
            <LeftSideSection title="Characters" />
            <LeftSideSection title="Locations" />
            <LeftSideSection title="Items" />
            <LeftSideSection title="Events" />
          </div>
          {/* Timeline right side */}
          <div
            className="h-fit bg-blue-600 min-w-full"
            style={{
              width: timelineData.totalDuration * 10,
            }}
          >
            {/* timeline time stamps */}
            {/* <div className="flex w-full h-10 bg-emerald-600 border-b border-neutral-700">
              TimeStamps
            </div> */}

            {/* timeline events */}
            <RightSideSection title="Characters" events={timelineData.character} totalDuration={timelineData.totalDuration} />
            <RightSideSection title="Locations" events={timelineData.location} totalDuration={timelineData.totalDuration} />
            <RightSideSection title="Items" events={timelineData.item} totalDuration={timelineData.totalDuration} />
            <RightSideSection title="Events" events={timelineData.event} totalDuration={timelineData.totalDuration} />
          </div>
        </div>
      </div>
    </div>
  );
}

type LeftSideSectionProps = {
  title: string;
}

function LeftSideSection(props: LeftSideSectionProps) {
  return (
    <div className="w-full h-12 min-h-[48px] flex justify-start p-2 items-center flex-row gap-2 border-b border-neutral-700">
      <Person className="w-6 h-6 text-neutral-50" />
      <span className="font-bold text-lg text-neutral-50">
        {props.title}
      </span>
    </div>
  );
}

type RightSideSectionProps = {
  title: string;
  events: TimelineEvents;
  totalDuration: number;
}

function RightSideSection(props: RightSideSectionProps) {
  return (
    <div
      className="min-w-full h-12 min-h-[48px] flex relative items-center flex-row gap-2 border-b border-neutral-700"
      style={{
        width: props.totalDuration * 10,
      }}
    >
      {
        props.events.markers.map((marker, index) => {
          return (
            <Link
              key={index}
              className="absolute h-[90%] bg-neutral-800 rounded-2xl flex-row flex justify-center items-center border border-neutral-700"
              style={{
                left: marker.startTimestamp * 10,
                width: (marker.endTimestamp - marker.startTimestamp) * 10,
              }}
              href={{
                pathname: `/page/${marker.id}`,
                slashes: true,
              }}
            >
              <span className="text-neutral-50">
                {marker.title}
              </span>
            </Link>
          )
        })
      }
    </div>
  );
}