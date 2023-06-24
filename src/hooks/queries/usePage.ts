//* Libraries imports
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//* Types imports
import type { Page, PageType } from "@prisma/client";

async function getPage(pageId: string): Promise<
  Page & {
    PageType: PageType;
  }
> {
  const response = await axios.get<
    Page & {
      PageType: PageType;
    }
  >(`/api/page/${pageId}`);
  return response.data;
}

/**
 * Hook to get full information about a page from the server.
 */

export default function usePage(
  pageId?: string
): UseQueryResult<Page & { PageType: PageType }, unknown> {
  const router = useRouter();
  const session = useSession();
  if (!session.data?.user?.id) {
    router.push("/");
  }
  let id = pageId || "";
  if (!pageId) {
    const index = router.query.index;
    if (typeof index === "string") {
      id = index;
    }
  }

  return useQuery(["page", id], () => getPage(id), {
    enabled: !!id, //only fetch if there is a pageId
    refetchOnWindowFocus: true,
  });
}
