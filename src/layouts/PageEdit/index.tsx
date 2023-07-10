//* Libraries imports
import { useState } from 'react';
import { Allotment, LayoutPriority } from "allotment";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

//* Component imports
import Scrollable from "../../components/common/Scrollable";
import { Navbar } from "../../components/specific/Navbar/Navbar";
const PageHeader = dynamic(() => import('../../components/specific/PageEditComponents/PageHeader'));
const PageInfo = dynamic(() => import('../../components/specific/PageEditComponents/PageInfo'));
const Sidebar = dynamic(() => import("../../components/specific/Sidebar/Sidebar"));
const TextEditorWraper = dynamic(() => import('../../components/TextEditor/TextEditorWraper'));
const PageBackgroundImage = dynamic(() => import('../../components/specific/PageBackgroundImage'));
const PageEditMenu = dynamic(() => import('../../components/specific/PageEditMenu'), { ssr: false });
const TimeLine = dynamic(() => import('../../components/common/TimeLine'), { ssr: false });

//* Hooks imports
import usePage from "../../hooks/queries/usePage";

type Props = {
  worldId: string;
  pageId: string;
}

export default function PageEdit(props: Props) {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);

  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className="w-screen h-screen bg-neutral-800 flex flex-row justify-start items-center">
      <Allotment>
        <Allotment.Pane>
          <Navbar
            worldId={page.data?.worldId || ""}
            isSidebarCollapsed={sidebarCollapse}
            setSidebarCollapse={setSidebarCollapse}
          />

          <Scrollable>
            {/* background */}
            <PageBackgroundImage />

            <div className='w-full max-w-7xl flex flex-col pt-28'>
              {/* content */}
              <div className='flex p-4 flex-col relative items-center w-full rounded-2xl bg-neutral-900 z-10 border border-neutral-600'>
                <PageEditMenu />
                {/* data */}
                <div className='flex items-start gap-4 rounded-2xl w-full'>
                  {/* blocks holder */}
                  <div className='flex flex-col gap-2 items-start w-full'>
                    <PageHeader />
                    {
                      page.data
                      && <TextEditorWraper page={page.data} />
                    }
                  </div>
                  {/* page content */}
                  <div className='w-1/4 flex flex-col items-start'>
                    <PageInfo />
                  </div>
                </div>
              </div>
            </div>

            {/* timeline */}
            <TimeLine />
          </Scrollable>
        </Allotment.Pane>
        <Allotment.Pane
          minSize={80}
          maxSize={320}
          visible={!sidebarCollapse}
          priority={LayoutPriority.High}
        >
          <Sidebar
            collapsed={sidebarCollapse}
            worldId={props.worldId}
          />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}