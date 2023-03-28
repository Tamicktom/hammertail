//* Libraries imports
import { useState, useEffect } from "react";
import Link from "next/link";
import { UsersThree } from "phosphor-react";
import type { Page } from "@prisma/client";
import { useSession } from "next-auth/react";

type PageTypes = "characters" | "places" | "items" | "events";

type ApiPageListing = {
  listing: PageTypes;
  pages: Page[];
}
type PageListProps = {
  content: PageTypes;
  worldId: string;
}

export default function PageList(props: PageListProps) {
  const title = props.content.charAt(0).toUpperCase() + props.content.slice(1);
  const [data, setData] = useState<ApiPageListing | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      getPagesByType(props.worldId, props.content)
        .then(res => setData(res))
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center border-2 border-tertiary-700 rounded-lg overflow-hidden">
      <div className="w-full bg-tertiary-600 px-4 py-2 gap-4 flex flex-row justify-start items-center">
        {renderIcon(props.content)}
        <span className="text-tertiary-200 font-bold text-xl">{title}</span>
      </div>
      <div className="w-full h-full max-h-full min-h-full overflow-x-hidden overflow-y-scroll">
        {
          data?.pages?.map(page => (
            <Link key={page.id} href={`/page/${page.id}`}>
              <button className="w-full px-1 py-2 bg-none hover:bg-tertiary-700 flex flex-row justify-start items-center">
                <span className="text-tertiary-200 font-bold">{page.name}</span>
              </button>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

function renderIcon(type: PageTypes) {
  switch (type) {
    case "characters":
      return <UsersThree className="w-8 h-8 text-tertiary-100" size={32} />
    case "places":
      return <UsersThree className="w-8 h-8 text-tertiary-100" size={32} />
    case "items":
      return <UsersThree className="w-8 h-8 text-tertiary-100" size={32} />
    case "events":
      return <UsersThree className="w-8 h-8 text-tertiary-100" size={32} />
  }
}

async function getPagesByType(worldId: string, pageType: PageTypes) {
  const body = {
    worldId,
    listing: pageType,
    action: "ListPages"
  }

  const res = await fetch("/api/pages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);
  return data as ApiPageListing;
}