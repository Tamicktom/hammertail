//* Libraries imports
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import * as Avatar from '@radix-ui/react-avatar';

type Props = {
  worldId: string;
}

export const Navbar = (props: Props) => {
  const { data: session } = useSession();

  return (
    <div className="h-24 w-full bg-tertiary-800 border-b-2 border-tertiary-400 flex justify-center items-center">
      <UserAvatar
        src={session?.user?.image || ""}
        alt={session?.user?.name || "User avatar"}
        name={session?.user?.name || ""}
      />
      <h1>Navbar</h1>
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
    if (splitedName) {
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
    } else
      return "";
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
          {
            getInitials()
          }
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}