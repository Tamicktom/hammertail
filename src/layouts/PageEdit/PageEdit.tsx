//* Libraries imports
import { useMemo, type ReactNode, type UIEvent } from 'react';
import dynamic from 'next/dynamic';
import { Allotment, LayoutPriority } from "allotment";
import * as ScrollArea from '@radix-ui/react-scroll-area';
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

const Navbar = dynamic(() => import('../../components/specific/Navbar/Navbar'), { ssr: false });
const PageHeader = dynamic(() => import('../../components/specific/PageEditComponents/PageHeader'));
const PageInfo = dynamic(() => import('../../components/specific/PageInfo'));
const Sidebar = dynamic(() => import("../../components/specific/Sidebar/Sidebar"));
const TextEditorWraper = dynamic(() => import('../../components/TextEditor/TextEditorWraper'));
const PageBackgroundImage = dynamic(() => import('../../components/specific/PageBackgroundImage'));
const PageEditMenu = dynamic(() => import('../../components/specific/PageEditMenu'), { ssr: false });

//* Hooks imports
import usePage from "../../hooks/queries/usePage";

//* Atom imports
import { worldAtom } from "../../atoms/world";
import { sidebarCollapseAtom } from '../../atoms/sidebar';

export default function PageEdit() {
  const [sidebarCollapse] = useAtom(sidebarCollapseAtom);

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
      <Allotment>
        <Allotment.Pane>
          <Scrollable>
            {/* background */}
            <PageBackgroundImage />

            <Navbar
              loading={page.isLoading || page.isFetching}
            />

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
        </Allotment.Pane>
        <Allotment.Pane
          minSize={80}
          maxSize={320}
          visible={!sidebarCollapse}
          priority={LayoutPriority.High}
        >
          <Sidebar />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

type ScrollableProps = {
  children: ReactNode;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
}

function Scrollable(props:
  ScrollableProps) {

  return (
    <ScrollArea.Root
      className="w-full h-full overflow-hidden"
      scrollHideDelay={750}
    >
      <ScrollArea.Viewport
        className="relative flex flex-col w-full h-full"
        onScroll={props.onScroll}
      >
        <div className='relative flex flex-col items-center justify-start w-full h-full bg-neutral-950'>
          {props.children}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex select-none h-full touch-none px-1 transition-all bg-neutral-800 hover:bg-neutral-700 relative hover:px-1.5"
      >
        <ScrollArea.Thumb
          className="absolute top-0 left-0 flex-1 rounded bg-neutral-600"
          style={{
            width:
              "100%",
          }}
        />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner
        className="bg-blue-400"
      />
    </ScrollArea.Root>
  );
}