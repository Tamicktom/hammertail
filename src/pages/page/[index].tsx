//* Libraries imports
import Head from "next/head";
import type { Page } from "@prisma/client";

//* Component imports
import PageEdit from "../../layouts/PageEdit/PageEdit";

//* Hooks imports
import usePage from "../../hooks/queries/usePage";

export default function Page() {
  const page = usePage();

  return (
    <>
      <Head>
        <title>{page.data?.name}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Page of an world" />
      </Head>
      <PageEdit />
    </>
  );
}
