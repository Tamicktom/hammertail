//* Libraries imports
import { useState } from "react";
import { useRouter } from "next/router";
import { User, Person } from "@phosphor-icons/react";

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
        <div className='w-full h-full bg-red-600 flex flex-row justify-center items-center'>
          {/* Timeline left side */}
          <div className="w-96 h-full bg-green-600 flex flex-col">
            <div className="w-full h-10 border-b border-neutral-700" />
            <div className="w-full h-16 flex justify-center items-center flex-row gap-2 border-b border-neutral-700">
              <Person className="w-8 h-8 text-white" />
              <span>
                Personagens
              </span>
            </div>
          </div>
          {/* Timeline right side */}
          <div className="w-full h-full bg-blue-600">
            {/* timeline time stamps */}
            <div className="flex w-full h-10 bg-emerald-600 border-b border-neutral-700">
              TimeStamps
            </div>

            {/* timeline events */}
            <div className="flex w-full h-16 bg-yellow-600 border-b border-neutral-700">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}