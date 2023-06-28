//* Libraries imports
import Head from "next/head";
import type { Page } from "@prisma/client";

//* Local imports
import { prisma } from "../../server/db/client";

//* Component imports
import PageEdit from "../../layouts/PageEdit/PageEdit";

// grab the page data from the database using the id from the url
// export const getServerSideProps = async (context: any) => {
//   const page = await prisma.page.findUnique({
//     where: {
//       id: context.params.index,
//     },
//   });

//   return {
//     props: {
//       page,
//     },
//   };
// };

export default function Page({ page }: { page: Page }) {
  return (
    <>
      <Head>
        {/* <title>{page.name}</title> */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Page of an world" />
      </Head>
      <PageEdit />
    </>
  );
}
