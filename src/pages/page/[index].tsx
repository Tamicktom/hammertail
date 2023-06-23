//* Libraries imports
import Head from "next/head";
import { useRouter } from "next/router";
import type { Page } from "@prisma/client";

//* Component imports
import PageEdit from "../../layouts/PageEdit/PageEdit";

//* Utilities imports
import actualPage from "../../store/common/actualPage";

//* Hooks imports
import usePage from "../../hooks/queries/usePage";

export default function Page() {
  const router = useRouter();
  const index = typeof router.query.index === "string" ? router.query.index : "";
  const page = usePage(index);

  return (
    <>
      <Head>
        <title>{page.data?.name}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Page of an world" />
      </Head>
      <PageEdit pageId={index} />
    </>
  );
}
