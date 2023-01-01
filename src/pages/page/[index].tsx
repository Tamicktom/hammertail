//* Libraries imports
import { getSession } from "next-auth/react";
import { prisma } from "../../server/db/client";
import type { GetServerSideProps } from "next";
import type { World, Page, Block } from "@prisma/client";

//* Component imports
import { Navbar } from "../../components/specific/Navbar/Navbar";
import { Sidebar } from "../../components/specific/Sidebar/Sidebar";
import { BlocksHolder } from "../../components/common/BlocksHolder/BlocksHolder";
import { Cake, Skull } from "phosphor-react";

//* Server side code ----------------------------------------------------------
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  // get the user id from the session
  const userId = session?.user?.id;
  const { pageId } = ctx?.query;

  const page = await prisma.page.findUnique({
    where: {
      id: JSON.parse(JSON.stringify(pageId)),
    },
    include: {
      world: true,
    },
  });

  if (page?.world.ownerId !== userId) {
    return {
      redirect: {
        destination: "/worlds",
        permanent: false,
      },
    };
  }

  //get blocks from the page
  const blocks = await prisma.block.findMany({
    where: {
      pageId: JSON.parse(JSON.stringify(pageId)),
    },
  });

  return {
    props: {
      page: JSON.parse(JSON.stringify(page)),
      blocks: JSON.parse(JSON.stringify(blocks)),
    },
  };
};

//* Client side code ----------------------------------------------------------

type Props = {
  page: Page;
  blocks: Block[];
}

export default function World({ page, blocks }: Props) {


  return (
    <div className="w-screen h-screen bg-gray-500 flex flex-row justify-start items-center">
      <div className="h-full w-full">
        <Navbar />
        <PageHeader title={page.name} pageType="Character" />
        <BlocksHolder pageId={page.id} startBlocks={blocks} />
        <PageInfo />
      </div>
      <Sidebar />
    </div>
  );
}





type PageHeaderProps = {
  title: string;
  pageType: string;
}

const PageHeader = ({ title, pageType }: PageHeaderProps) => {
  return (
    <div className='flex flex-col w-full gap-2 bg-slate-600'>
      <span className='font-bold text-white'>{pageType}</span>
      <h1 className="text-5xl font-bold text-white">{title}</h1>
    </div>
  );
}

const PageInfo = () => {
  return (
    <>
      {/* character info */}
      <div className="p-2 w-72" >
        <div className='flex items-center justify-center w-full'>
          <img
            src="https://i.pinimg.com/564x/bb/14/18/bb1418129cfc0b35f874d249bb5ff9e6.jpg"
            alt="Imagem do personagem"
            className="w-full rounded-lg"
            loading='lazy'
          />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='w-full'>
            <span className='text-lg font-bold text-white'>Mage of Cats</span>
          </div>
          <div className='flex flex-col w-full gap-2'>
            <div className='flex flex-row w-full gap-2'>
              <Cake size={24} className="text-white" />
              <span className='text-base text-white'>12/02/3652</span>
            </div>
            <div className='flex flex-row w-full gap-2'>
              <Skull size={24} className="text-white" />
              <span className='text-base text-white'>31/09/3698</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}