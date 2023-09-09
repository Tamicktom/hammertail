//* Libraries imports
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Plus } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import z from "zod";

//* Component imports
import Alert from "../../Toasts/Alert";

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";

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

export default function CreatePageButton() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  if (page.isLoading || page.isFetching) return (
    <button className="flex items-center w-[135px] h-10 gap-2 px-4 py-2 rounded-md bg-gradient-to-b from-primary-600 to-primary-800 animate-pulse" />
  );

  const createPage = async (type: PageTypes) => {
    if (!page.data?.worldId) return toast.custom((t) => (
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
      worldId: page.data?.worldId,
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