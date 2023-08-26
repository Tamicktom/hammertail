//* Libraries imports
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';

//* Component imports
// import { Navbar } from "../../components/specific/Navbar/Navbar";
// import PageHeader from '../../components/specific/PageEditComponents/PageHeader';
// import PageInfo from '../../components/specific/PageInfo';
// import Sidebar from "../../components/specific/Sidebar/Sidebar";
// import TextEditorWraper from '../../components/TextEditor/TextEditorWraper';
// import PageBackgroundImage from '../../components/specific/PageBackgroundImage';
// import PageEditMenu from '../../components/specific/PageEditMenu';
// import Scrollable from '../../components/common/Scrollable';

const Navbar = dynamic(() => import('../../components/specific/Navbar/Navbar'));
const PageHeader = dynamic(() => import('../../components/specific/PageEditComponents/PageHeader'));
const PageInfo = dynamic(() => import('../../components/specific/PageInfo'));
const TextEditorWraper = dynamic(() => import('../../components/TextEditor/TextEditorWraper'));
const PageBackgroundImage = dynamic(() => import('../../components/specific/PageBackgroundImage'));
const Scrollable = dynamic(() => import('../../components/common/Scrollable'));
const PageEditMenu = dynamic(() => import('../../components/specific/PageEditMenu'));
const Sidebar = dynamic(() => import("../../components/specific/Sidebar/Sidebar"), { ssr: false });

//* Hooks imports
import usePage from "../../hooks/queries/usePage";

//* Atom imports
import { worldAtom } from "../../atoms/world";

export default function PageEdit() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  const [, setWorld] = useAtom(worldAtom);

  useMemo(() => {
    if (page.data?.world) {
      setWorld(page.data.world);
    }
  }, [page.data]);

  return (
    <div className="flex flex-row items-center justify-start w-screen h-screen bg-neutral-800">
      <div className='w-full min-h-screen h-full'>
        <Scrollable>
          {/* background */}
          <PageBackgroundImage />
          <Navbar />

          <div className='flex flex-col w-full transition-all ease-in pt-80 max-w-7xl xl:pt-32'>
            {/* content */}
            <div className='relative z-10 flex flex-col items-center w-full p-4 border rounded-2xl bg-neutral-900 border-neutral-600'>
              <PageEditMenu />
              {/* data */}
              <div className='flex flex-col-reverse items-start w-full gap-0 sm:gap-4 sm:flex-row rounded-2xl'>
                {/* blocks holder */}
                <div className='flex flex-col items-start w-full gap-2'>
                  <div className='hidden sm:flex'>
                    <PageHeader />
                  </div>
                  {page.data && <TextEditorWraper page={page.data} />}
                </div>
                {/* page content */}
                <div className='flex flex-col items-start w-full sm:w-1/2 lg:w-1/4'>
                  <PageInfo />
                </div>
                {/* page header */}
                <div className='flex flex-col items-start w-full gap-2 sm:hidden'>
                  <PageHeader />
                </div>
              </div>
            </div>
          </div>

          {/* timeline */}
          {/* <div className='sticky bottom-0 left-0 z-10 flex items-center justify-center w-full h-28'>
              <div className='w-full h-full max-w-7xl bg-amber-600'>
                Timeline
              </div>
            </div> */}
        </Scrollable>
      </div>
      <Sidebar />
    </div>
  );
}