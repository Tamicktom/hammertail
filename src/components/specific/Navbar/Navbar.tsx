//* Libraries imports
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Sidebar } from "@phosphor-icons/react";
import { Plus } from "@phosphor-icons/react";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import z from "zod";

//* Local imports
import Alert from "../../Toasts/Alert";
import { worldAtom } from "../../../atoms/world";
import { sidebarCollapseAtom, setSidebarState } from "../../../atoms/sidebar";
import usePage from "../../../hooks/queries/usePage";

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

function ToggleSidebarButton() {
  const [sidebarCollapse, setSidebarCollapse] = useAtom(sidebarCollapseAtom);

  function toggleSidebar() {
    setSidebarCollapse(() => !sidebarCollapse);
    setSidebarState(!sidebarCollapse);
  }

  return (
    <button
      className="w-5 h-5 rounded-full"
      name="sidebarCollapse"
      aria-label="sidebarCollapse"
      onClick={toggleSidebar}
      children={<Sidebar className="w-5 h-5 text-neutral-500" />}
    />
  );
}

function UserAvatar() {
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

const pageTypeSchema = z.enum([
  "characters",
  "places",
  "items",
  "events",
]);

type PageTypes = z.infer<typeof pageTypeSchema>;

const createSpecificPageSchema = z.object({
  worldId: z.string().uuid(),
  pageType: pageTypeSchema,
});

const apiResponseSchema = z.object({
  ok: z.boolean(),
  error: z.string().optional(),
  page: z.object({
    id: z.string().uuid(),
  }),
});

type CreatePageButtonProps = {
}

function CreatePageButton(props: CreatePageButtonProps) {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");
  const [world] = useAtom(worldAtom);

  if (page.isLoading || page.isFetching) return (
    <button className="flex items-center w-[135px] h-10 gap-2 px-4 py-2 rounded-md bg-gradient-to-b from-primary-600 to-primary-800 animate-pulse" />
  );

  const createPage = async (type: PageTypes) => {
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

    const body = createSpecificPageSchema.safeParse({
      worldId: world.id,
      pageType: type,
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

    const response = await fetch("/api/pages/createSpecificPage", {
      method: "POST",
      body: JSON.stringify(body.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = apiResponseSchema.safeParse(await response.json());

    if (data.success) {
      router.push(`/page/${data.data.page.id}`);
    } else {
      toast.custom((t) => (
        <Alert
          t={t}
          topMsg='erro ao criar página!'
          bottomMsg={data.error.message}
        />
      ), {
        duration: 1000,
        position: 'top-center',
      })
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          name="newPage"
          aria-label="newPage"
          className="flex items-center gap-2 px-4 py-2 font-bold text-white transition-all rounded-md bg-primary-700 hover:bg-primary-700"
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
              onClick={() => createPage("characters")}
            >
              Character
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            <button
              onClick={() => createPage("events")}
            >
              Event
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            <button
              onClick={() => createPage("items")}
            >
              Item
            </button>
          </DropdownMenu.Item>

          <DropdownMenu.Item>
            <button
              onClick={() => createPage("places")}
            >
              Place
            </button>
          </DropdownMenu.Item>

        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}