//* Component imports
import { CreatePageButton, ToggleSidebarButton } from "../../common/Buttons";
import { UserAvatar } from "../../common/Avatars";

export default function Navbar() {
  return (
    <div
      className="sticky top-0 left-0 z-20 flex flex-row items-center justify-between w-full h-32 gap-4 px-4 py-2 transition-all ease-in border-b-2 border-neutral-700 xl:h-20 backdrop-blur-xl bg-neutral-800/90"
    >
      <UserAvatar />
      <div className="flex flex-row items-center gap-4">
        <CreatePageButton />
        <ToggleSidebarButton />
      </div>
    </div>
  );
};
