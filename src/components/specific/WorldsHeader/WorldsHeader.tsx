//* libraries imports
import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import colors from "tailwindcss/colors";

// import WorldCreationModal from "../WorldCreationModal/WorldCreationModal";
const WorldCreationModal = dynamic(() => import("../WorldCreationModal/WorldCreationModal"), {
  loading: () => <button className="flex flex-row items-center justify-center gap-2 px-2 py-1 bg-none" />
});

type Props = {
  filterHandler: (filter: string) => void;
}

const WorldsHeader = ({ filterHandler }: Props) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="w-full h-[200px] flex flex-col justify-center items-center gap-4 p-4">
      <h1 className="font-bold text-white text-7xl">Worlds</h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <div
          className="relative flex flex-row items-center justify-center w-64 px-4 py-1 bg-neutral-950 rounded-lg border border-neutral-800"
          style={{ backgroundColor: isInputFocused ? colors.neutral[800] : colors.neutral[950] }}
        >
          <input
            className="w-full outline-none text-neutral-50 font-semibold bg-transparent"
            type="text"
            placeholder="Search"
            onChange={(e) => { filterHandler(e.target.value); }}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <MagnifyingGlass className="w-7 h-7 text-neutral-300" />
        </div>
        <WorldCreationModal />
      </div>
    </div>
  );
}

export default WorldsHeader;
