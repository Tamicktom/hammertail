//* Libraries imports
import { useEffect, useState } from "react";
import { SpinnerGap, CheckCircle, XCircle } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import colors from "tailwindcss/colors";

//* Component imports
import { CreatePageButton, ToggleSidebarButton } from "../../common/Buttons";
import EditWorldInfo from "../../common/EditWorldInfo";

//* Import atom
import { saveStateAtom } from "../../../atoms/saveStates";

export default function Navbar() {
  return (
    <div
      className="sticky top-0 left-0 z-20 flex flex-row items-center justify-between w-full h-24 gap-4 px-4 py-2 transition-all ease-in border-b-2 border-neutral-700 xl:h-20 backdrop-blur-xl bg-neutral-800/90"
    >
      <div className="flex gap-2">
        <EditWorldInfo />
        <SaveInfo />
      </div>
      <div className="flex flex-row items-center gap-4">
        <CreatePageButton />
        <ToggleSidebarButton />
      </div>
    </div>
  );
}

function SaveInfo() {
  const saving = useAtom(saveStateAtom)[0];
  const [color, setColor] = useState<string>(colors.red[400]);

  useEffect(() => {
    if (saving === "saving") {
      setColor(colors.blue[400]);
    } else if (saving === "saved") {
      setColor(colors.green[400]);
      setTimeout(() => {
        setColor("transparent");
      }, 1500);
    } else if (saving === "error") {
      setColor(colors.red[400]);
    }
  }, [saving]);

  return (
    <div className="flex flex-row items-center gap-1">
      <span
        className="text-sm font-medium transition-all ease-in-out duration-1000"
        style={{ color }}
      >
        {saving.charAt(0).toUpperCase() + saving.slice(1)}
      </span>
      {
        saving === "saving"
          ? <SpinnerGap color={color} className="w-4 h-4 animate-spin transition-all ease-in-out duration-1000" />
          : saving === "saved"
            ? <CheckCircle color={color} className="w-4 h-4 transition-all ease-in-out duration-1000" />
            : saving === "error"
              ? <XCircle color={color} className="w-4 h-4 transition-all ease-in-out duration-1000" />
              : null
      }
    </div>
  );
}

