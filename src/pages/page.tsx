//* Libraries imports
import Head from "next/head";
import type { Page } from "@prisma/client";
import type { GetServerSideProps } from "next";

//* Local imports
import { prisma } from "../server/db/client";

//* Component imports
import EmptyPageEdit from "../layouts/EmptyPageEdit";

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
      worldId: page.worldId,
    },
  };
};

export default function Page({ worldId }: { worldId: string }) {
  return (
    <>
      <Head>
        <title>World Home</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="World Home" />
      </Head>
      <EmptyPageEdit
        worldId={worldId}
      />
    </>
  );
}
