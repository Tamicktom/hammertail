//* Libraries imports
import { useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";


export default function UserAvatar() {
  const session = useSession();
  const user = session?.data?.user;

  //user can have a profile picture or not
  //if not, we will use the first two letters of the name and the last name.
  //but, the user can have a name with only one word, so we will use the first two letters of the name.

  const getInitials = () => {
    const splitedName = user?.name?.split(" ") || [];
    let firstInitial = "";
    let secondInitial = "";
    if (splitedName.length > 1) {
      if (splitedName[0] && splitedName[0].length > 0)
        firstInitial = splitedName[0].charAt(0);
      if (splitedName[1] && splitedName[1].length > 0)
        secondInitial = splitedName[1].charAt(0);
      else return firstInitial;
    } else {
      if (splitedName[0] && splitedName[0].length > 0)
        firstInitial = splitedName[0].charAt(0);
      if (splitedName[0] && splitedName[0].length > 1)
        secondInitial = splitedName[0].charAt(1);
    }
    return (firstInitial + secondInitial).toUpperCase();
  };

  if (session.status === "loading") return (
    <div className="flex gap-5">
      <div className="flex items-center justify-center w-20 h-20 overflow-hidden transition-all ease-in xl:w-12 xl:h-12">
        <div
          className="object-cover w-full h-full rounded-full bg-gradient-to-b from-primary-600 to-primary-800 animate-pulse"
        />
      </div>
    </div>
  );

  return (
    <div className="flex gap-5">
      <Avatar.Root className="flex items-center justify-center w-20 h-20 overflow-hidden transition-all ease-in xl:w-12 xl:h-12">
        <Avatar.Image
          className="object-cover w-full h-full rounded-full"
          src={user?.image || ""}
          alt="User avatar"
        />
        <Avatar.Fallback
          className="flex items-center justify-center object-cover w-full h-full text-2xl font-bold text-white rounded-full bg-gradient-to-b from-primary-600 to-primary-800"
          delayMs={600}
        >
          {getInitials()}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}