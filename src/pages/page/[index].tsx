//* Libraries imports
import Head from "next/head";
import type { Page } from "@prisma/client";

//* Component imports
import PageEdit from "../../layouts/PageEdit/PageEdit";

//* Utilities imports
import actualPage from "../../store/common/actualPage";

export default function Page() {

  const page = actualPage.getState();

  return (
    <>
      <Head>
        <title></title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Page of an world" />
      </Head>
      <PageEdit
        page={page}
      />
    </>
  );
}
