//* Libraries imports
import { MagnifyingGlass, Plus } from "phosphor-react";

type Props = {
  display: boolean;
  setDisplay: (display: boolean) => void;
  filterHandler: (filter: string) => void;
}

const WorldHeader = ({ display, setDisplay, filterHandler }: Props) => {
  return (
    <div className="w-full h-[200px] flex flex-col  justify-center items-center gap-4 p-4">
      <h1 className="font-bold text-white text-7xl">Mundos</h1>
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="relative flex flex-row items-center justify-center w-64 px-4 py-1 bg-white rounded-lg">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => { filterHandler(e.target.value); }}
          />
          <MagnifyingGlass className="w-5 h-5" />
        </div>
        <button
          className="flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-lg bg-gradient-to-b from-purple-500 to-purple-700"
          onClick={() => { setDisplay(!display); }}
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="font-bold text-white uppercase">Novo Mundo</span>
        </button>
      </div>
    </div>
  );
}

export default WorldHeader;