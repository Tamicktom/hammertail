//* Libraries imports
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Sidebar } from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import z from "zod";
import toast from "react-hot-toast";
import { useAtom } from "jotai";

//* Local imports
import Alert from "../../Toasts/Alert";
import { worldAtom } from "../../../atoms/world";
import { sidebarCollapseAtom, setSidebarState } from "../../../atoms/sidebar";

const apiResponseSchema = z.object({
  page: z.object({
    id: z.string(),
  }),
  status: z.enum(["created"]),
});

const pageCreationSchema = z.object({
  action: z.enum(["createPage"]),
  worldId: z.string(),
});

type Props = {
  loading: boolean;
}

export default function Navbar(props: Props) {
  const { data: session } = useSession();
  const [sidebarCollapse, setSidebarCollapse] = useAtom(sidebarCollapseAtom);

  if (props.loading) return (
    <div className="w-full h-20 z-20 px-4 py-2 sticky top-0 left-0 flex flex-row gap-4 items-center justify-between transition-all backdrop-blur-xl border-b-2 bg-neutral-800/90" />
  );

  function toggleSidebar() {
    setSidebarCollapse(() => !sidebarCollapse);
    setSidebarState(!sidebarCollapse);
  }

  return (
    <div
      className="w-full h-20 z-20 px-4 py-2 sticky top-0 left-0 flex flex-row gap-4 items-center justify-between transition-all backdrop-blur-xl border-b-2 bg-neutral-800/90"
    >
      <UserAvatar
        src={session?.user?.image || ""}
        alt={session?.user?.name || "User avatar"}
        name={session?.user?.name || ""}
      />
      <div className="flex flex-row items-center gap-4">
        <CreatePageButton />

        <button
          className="bg-neutral-800"
          name="sidebarCollapse"
          aria-label="sidebarCollapse"
          onClick={toggleSidebar}
        >
          <Sidebar size="20" />
        </button>
      </div>
    </div>
  );
};

type UserAvatarProps = {
  src: string;
  alt: string;
  name: string;
};

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
      else return firstInitial;
    } else {
      if (splitedName[0] && splitedName[0].length > 0)
        firstInitial = splitedName[0].charAt(0);
      if (splitedName[0] && splitedName[0].length > 1)
        secondInitial = splitedName[0].charAt(1);
    }
    return (firstInitial + secondInitial).toUpperCase();
  };

  return (
    <div className="flex gap-5">
      <Avatar.Root className="flex h-12 w-12 items-center justify-center overflow-hidden">
        <Avatar.Image
          className="h-full w-full rounded-full object-cover"
          src={props.src}
          alt={props.alt}
        />
        <Avatar.Fallback
          className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-primary-600 to-primary-800 object-cover text-2xl font-bold text-white"
          delayMs={600}
        >
          {getInitials()}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

type CreatePageButtonProps = {
}

function CreatePageButton(props: CreatePageButtonProps) {
  const [world] = useAtom(worldAtom);
  const router = useRouter();

  const createPage = async () => {

    if (!world) return toast.custom((t) => (
      <Alert
        t={t}
        topMsg='erro ao criar página!'
        bottomMsg='você precisa estar em um mundo para criar uma página'
      />
    ), {
      duration: 1000,
      position: 'top-center',
    })

    console.log(world);

    // const body = pageCreationSchema.safeParse({
    //   action: "createPage",
    //   worldId: world.id,
    // });

    // if (!body.success) return toast.custom((t) => (
    //   <Alert
    //     t={t}
    //     topMsg='erro ao criar página!'
    //     bottomMsg={body.error.message}
    //   />
    // ), {
    //   duration: 1000,
    //   position: 'top-center',
    // })

    // const response = await fetch("/api/pages", {
    //   method: "POST",
    //   body: JSON.stringify(body.data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const data = apiResponseSchema.safeParse(await response.json());

    // if (data.success) {
    //   router.push(`/page/${data.data.page.id}`);
    // }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          name="newPage"
          aria-label="newPage"
          className="flex items-center gap-2 rounded-md bg-primary-700 px-4 py-2 font-bold text-white transition-all hover:bg-primary-700"
          onClick={() => {
            console.log("new page");
          }}
        >
          <Plus size={20} />
          New Page
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          alignOffset={-5}
          className="min-w-[220px] bg-white rounded-md shadow-lg p-2 z-40"
        >
          <DropdownMenu.Item>
            <button
              onClick={createPage}
            >
              Character
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            Event
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            Place
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            Item
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}