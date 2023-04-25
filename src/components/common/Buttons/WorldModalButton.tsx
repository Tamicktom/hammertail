//* Libraries imports
import { Globe } from "@phosphor-icons/react";
type Props = {
  onClick: () => void;
};
export function WorldModalButton(props: Props) {
  return (
    <div className="flex">
      <button
        onPointerDown={props.onClick}
        className="flex h-8 w-40 flex-row items-center justify-center gap-2 rounded-md bg-primary-500 bg-gradient-to-t from-primary-700 font-primary font-bold uppercase text-black"
      >
        <Globe />
        Criar mundo
      </button>
    </div>
  );
}
