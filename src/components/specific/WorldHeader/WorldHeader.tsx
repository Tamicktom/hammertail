//* Libraries imports
import { MagnifyingGlass } from "@phosphor-icons/react";
// import dynamic from "next/dynamic";

//* Type import
import type { World } from "@prisma/client";

//* Components imports
import PageCreationModal from "../../specific/PageCreationModal/PageCreationModal";
// const PageCreationModal = dynamic(() => import("../../specific/PageCreationModal/PageCreationModal"), {
//   loading: () => <button className="flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-lg bg-transparent" />,
// });

type Props = {
  filterHandler: (filter: string) => void;
  world: World;
}

const WorldsHeader = (props: Props) => {
  return (
    <div className="w-full h-[200px] flex flex-col  justify-center items-center gap-4 p-4">
      <h1 className="font-bold text-white text-7xl">{props.world.name}</h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="relative flex flex-row items-center justify-center w-64 px-4 py-1 bg-white rounded-lg">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => { props.filterHandler(e.target.value); }}
          />
          <MagnifyingGlass className="w-5 h-5" />
        </div>
        <PageCreationModal worldId={props.world.id} />
      </div>
    </div>
  );
}

export default WorldsHeader;