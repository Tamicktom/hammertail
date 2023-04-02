//* Libraries imports
import { Globe } from "@phosphor-icons/react";

export function WorldModalButton() {
    return (
        <div className="flex">
            <button className="h-8 w-40 uppercase font-primary font-bold flex justify-center items-center gap-2 flex-row rounded-md bg-primary-500 text-black bg-gradient-to-t from-primary-700">

                <Globe />
                Criar mundo

            </button>
        </div>
    );
}