//* Libraries imports
import { useState, useEffect } from "react";
import Link from "next/link";
import type { Page } from "@prisma/client";
import { useSession } from "next-auth/react";

//* Local imports
import { useGetPagesByType } from "../../../hooks/common/useGetPagesByType"
import type { PageTypes } from "../../../types/page";
import PageTypeIcon from "../PageTypeIcon/PageTypeIcon";

type PageListProps = {
  content: PageTypes;
  worldId: string;
}

export default function PageList(props: PageListProps) {
  const title = props.content.charAt(0).toUpperCase() + props.content.slice(1);

  const pages = useGetPagesByType(props.worldId, props.content);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center border-2 border-tertiary-700 rounded-lg overflow-hidden">
      <div className="w-full bg-neutral-600 px-4 py-2 gap-4 flex flex-row justify-start items-center">
        {PageTypeIcon(props.content)}
        <span className="text-neutral-200 font-bold text-xl">{title}</span>
      </div>
      <div className="w-full h-full max-h-full min-h-full overflow-x-hidden overflow-y-scroll">
        {
          pages?.data?.data.pages.map(page => (
            <Link key={page.id} href={`/page/${page.id}`}>
              <button className="w-full px-1 py-2 bg-none hover:bg-neutral-700 flex flex-row justify-start items-center">
                <span className="text-neutral-200 font-bold">{page.name}</span>
              </button>
            </Link>
          ))
        }
      </div>
    </div>
  );
}