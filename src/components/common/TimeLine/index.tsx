//* Libraries imports
import { useState } from "react";
import { useRouter } from "next/router";
import { Person } from "@phosphor-icons/react";

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";
import useDebounce from "../../../hooks/common/useDebounce";

export default function TimeLine() {
  const [isOpen, setIsOpen] = useState(true);
  const debouncedIsOpen = useDebounce(isOpen, 150);

  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div
      className='flex flex-col justify-center items-center w-full sticky left-0 bottom-0 z-10 transition-all'
      style={{
        height: isOpen ? "40vh" : "40px",
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
          <div className="w-full h-fit bg-blue-600">
            {/* timeline time stamps */}
            {/* <div className="flex w-full h-10 bg-emerald-600 border-b border-neutral-700">
              TimeStamps
            </div> */}

            {/* timeline events */}
            <RightSideSection />
            <RightSideSection />
            <RightSideSection />
            <RightSideSection />
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

function RightSideSection() {
  return (
    <div className="w-full h-12 min-h-[48px] flex justify-center items-center flex-row gap-2 border-b border-neutral-700">
      Timeline track
    </div>
  );
}