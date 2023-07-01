//* Libraries imports
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Sidebar } from "@phosphor-icons/react";
import * as Avatar from '@radix-ui/react-avatar';
import z from "zod";
import colors from "tailwindcss/colors";
import toast from "react-hot-toast";

//* Local imports
import Alert from "../../Toasts/Alert";

const apiResponseSchema = z.object({
  page: z.object({
    id: z.string()
  }),
  status: z.enum(["created"]),
});

const pageCreationSchema = z.object({
  action: z.enum(["createPage"]),
  worldId: z.string(),
});

type Props = {
  worldId: string;
  isSidebarCollapsed: boolean;
  setSidebarCollapse: (value: boolean) => void;
}

export const Navbar = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const createPage = async () => {
    const body = pageCreationSchema.safeParse({
      action: "createPage",
      worldId: props.worldId,
    });

    if (!body.success) return toast.custom((t) => (
      <Alert
        t={t}
        topMsg='erro ao criar página!'
        bottomMsg={body.error.message}
      />
    ), {
      duration: 1000,
      position: 'top-center',
    })

    const response = await fetch("/api/pages", {
      method: "POST",
      body: JSON.stringify(body.data),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = apiResponseSchema.safeParse(await response.json());

    if (data.success) {
      router.push(`/page/${data.data.page.id}`)
    }
  }

  return (
    <div
      className="w-full h-20 z-10 px-4 py-2 sticky top-0 left-0 flex flex-row gap-4 items-center justify-between transition-all backdrop-blur-xl border-b-2"
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
          onClick={createPage}
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