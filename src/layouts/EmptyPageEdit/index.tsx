//* Libraries imports
import { useState } from 'react';
import { Allotment, LayoutPriority } from "allotment";
import dynamic from 'next/dynamic';

//* Component imports
import Scrollable from "../../components/common/Scrollable";
import { Navbar } from "../../components/specific/Navbar/Navbar";
const Sidebar = dynamic(() => import("../../components/specific/Sidebar/Sidebar"));
const TimeLine = dynamic(() => import('../../components/common/TimeLine'), { ssr: false });


type Props = {
  worldId: string;
}

export default function EmptyPageEdit(props: Props) {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);

  return (
    <div className="w-screen h-screen bg-neutral-800 flex flex-row justify-start items-center">
      <Allotment>
        <Allotment.Pane>
          <Navbar
            worldId={props.worldId}
            isSidebarCollapsed={sidebarCollapse}
            setSidebarCollapse={setSidebarCollapse}
          />

          <Scrollable>

            <div className='w-full max-w-7xl flex flex-col pt-28'>
              {/* content */}
              <div className='flex p-4 flex-col relative items-center w-full rounded-2xl bg-neutral-900 z-10 border border-neutral-600'>
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