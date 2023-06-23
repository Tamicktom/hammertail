//* Libraries imports
import { useSession } from "next-auth/react";
import { Sidebar } from "@phosphor-icons/react";
import * as Avatar from '@radix-ui/react-avatar';

import colors from "tailwindcss/colors";

export const Navbar = (props: Props) => {
  const { data: session } = useSession();
  return (
    <div
      className="w-full h-20 z-10 px-4 py-2 sticky top-0 left-0 flex flex-row gap-4 items-center justify-between transition-all backdrop-blur-xl border-b-2"
      style={{
        backgroundColor: props.collapsed ? "none" : colors.neutral[800][0.9],
        borderColor: props.collapsed ? "transparent" : "",
      }}
    >
      <UserAvatar
        src={session?.user?.image || ""}
        alt={session?.user?.name || "User avatar"}
        name={session?.user?.name || ""}
      />
      <div className="flex flex-row items-center gap-4">
        <button
          name="newPage"
          aria-label="newPage"
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary-800 text-white font-bold hover:bg-primary-700 transition-all"
        >
          New Page
        </button>
        <button
          name="sidebarCollapse"
          aria-label="sidebarCollapse"
          onClick={() => props.setSidebarCollapse(!props.isSidebarCollapsed)}
        >
          <Sidebar size="24" />
        </button>
      </div>
    </div>
  );
}

type UserAvatarProps = {
  src: string;
  alt: string;
  name: string;
}

function UserAvatar(props: UserAvatarProps) {
  //user can have a profile picture or not
  //if not, we will use the first two letters of the name and the last name.
  //but, the user can have a name with only one word, so we will use the first two letters of the name.

  const getInitials = () => {
    const splitedName = props.name.split(" ");
    let firstInitial = "";
    let secondInitial = "";
    if (splitedName.length > 1) {
      if (splitedName[0] && splitedName[0].length > 0)
        firstInitial = splitedName[0].charAt(0);
      if (splitedName[1] && splitedName[1].length > 0)
        secondInitial = splitedName[1].charAt(0);
      else
        return firstInitial;
    } else {
      if (splitedName[0] && splitedName[0].length > 0)
        firstInitial = splitedName[0].charAt(0);
      if (splitedName[0] && splitedName[0].length > 1)
        secondInitial = splitedName[0].charAt(1);
    }
    return (firstInitial + secondInitial).toUpperCase();
  }

  return (
    <div className="flex gap-5">
      <Avatar.Root className="w-12 h-12 overflow-hidden flex justify-center items-center">
        <Avatar.Image
          className="w-full h-full object-cover rounded-full"
          src={props.src}
          alt={props.alt}
        />
        <Avatar.Fallback
          className="w-full h-full object-cover rounded-full bg-gradient-to-b from-primary-600 to-primary-800 flex justify-center items-center text-white font-bold text-2xl"
          delayMs={600}
        >
          {getInitials()}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

type Props = {
  worldId: string;
  collapsed: boolean;
  isSidebarCollapsed: boolean;
  setSidebarCollapse: (value: boolean) => void;
}