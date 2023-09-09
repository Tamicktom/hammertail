//* Libraries imports
import Head from "next/head";
import type { Page } from "@prisma/client";
import type { GetServerSideProps } from "next";

//* Local imports
import { prisma } from "../../server/db/client";

//* Component imports
import PageEdit from "../../layouts/PageEdit";

// grab the page data from the database using the id from the url
export const getServerSideProps = async (context: GetServerSideProps & {
  params?: {
    index?: string;
  }
}) => {
  const page = await prisma.page.findUnique({
    where: {
      id: context.params?.index,
    },
  });

  if (!page) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pageName: page.name,
      pageId: page.id,
      worldId: page.worldId,
    },
  };
};

export default function Page({ pageName, pageId, worldId }: { pageName: string, worldId: string, pageId: string }) {
  return (
    <>
      <Head>
        <title>{pageName}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Page of an world" />
      </Head>
      <PageEdit />
    </>
  );
}
