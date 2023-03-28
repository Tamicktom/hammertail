//* Libraries imports
import { MagnifyingGlass, Plus } from "phosphor-react";

//* Components imports
import PageCreationModal from "../../specific/PageCreationModal/PageCreationModal";

type Props = {
  filterHandler: (filter: string) => void;
  worldId: string;
}

const WorldsHeader = (props: Props) => {
  return (
    <div className="w-full h-[200px] flex flex-col  justify-center items-center gap-4 p-4">
      <h1 className="font-bold text-white text-7xl">Mundos</h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="relative flex flex-row items-center justify-center w-64 px-4 py-1 bg-white rounded-lg">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => { props.filterHandler(e.target.value); }}
          />
          <MagnifyingGlass className="w-5 h-5" />
        </div>
        <PageCreationModal worldId={props.worldId} />
      </div>
    </div>
  );
}

export default WorldsHeader;