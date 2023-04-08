//* Libraries imports
import { Allotment, LayoutPriority } from "allotment";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { Page, Block } from '@prisma/client';
import { type ReactNode, useState } from 'react';

//* Component imports
import { Navbar } from "../../components/specific/Navbar/Navbar";
import { PageHeader } from "../../components/specific/PageEditComponents/PageHeader";
import { PageInfo } from "../../components/specific/PageEditComponents/PageInfo";
import { Sidebar } from "../../components/specific/Sidebar/Sidebar";
import BlockEditor from "../../components/BlockEditor/BlockEditor";

type Props = {
  worldId: string;
  page: Page;
  blocks: Block[];
}

export default function PageEdit(props: Props) {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);
  const [navBarCollapse, setNavBarCollapse] = useState(false);

  return (
    <div className="w-screen h-screen bg-tertiary-800 flex flex-row justify-start items-center">
      <Allotment
        onVisibleChange={(visible) => {
          console.log("visible", visible);
        }}
      >
        <Allotment.Pane>
          <Scrollable>
            <Navbar
              worldId={props.worldId}
              collapsed={navBarCollapse}
              isSidebarCollapsed={sidebarCollapse}
              setSidebarCollapse={setSidebarCollapse}
            />
            <div className="h-40 w-full" />
            <div className="w-full h-full flex flex-row justify-center items-start gap-2">
              <div className="w-full max-w-5xl flex flex-col justify-center items-start mb-80">
                <PageHeader title={props.page.name} pageType="" />
                <BlockEditor />
              </div>
              <PageInfo page={props.page} />
            </div>
          </Scrollable>
        </Allotment.Pane>
        <Allotment.Pane
          minSize={80}
          maxSize={320}
          visible={!sidebarCollapse}
          priority={LayoutPriority.High}
        >
          <Sidebar
            worldId={props.worldId}
            collapsed={sidebarCollapse}
          />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}


function Scrollable({ children }: { children: ReactNode }) {
  return (
    <ScrollArea.Root
      className="w-full h-full overflow-hidden"
    >
      <ScrollArea.Viewport
        className="w-full h-full relative"
      >
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
      >
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}