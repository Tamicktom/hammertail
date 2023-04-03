//* Libraries imports
import { Allotment } from "allotment";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { Page, Block } from '@prisma/client';
import { type ReactNode, useState } from 'react';

//* Component imports
import { Navbar } from "../../components/specific/Navbar/Navbar";
import { PageHeader } from "../../components/specific/PageEditComponents/PageHeader";
import { BlocksHolder } from "../../components/common/BlocksHolder/BlocksHolder";
import { PageInfo } from "../../components/specific/PageEditComponents/PageInfo";
import { Sidebar } from "../../components/specific/Sidebar/Sidebar";

type Props = {
  worldId: string;
  page: Page;
  blocks: Block[];
}

export default function PageEdit(props: Props) {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);

  return (
    <div className="w-screen h-screen bg-tertiary-800 flex flex-row justify-start items-center">
      <Allotment
        onVisibleChange={(visible) => console.log(visible)}
        onChange={(sizes) => {
          if (sizes[1] && sizes[1] <= 90) setSidebarCollapse(false);
          else setSidebarCollapse(true);
        }}
      >
        <Allotment.Pane>
          <Scrollable>
            <Navbar worldId={props.worldId} />
            <div className="w-full h-full flex flex-row justify-center items-start pt-40">
              <div className="w-full max-w-5xl flex flex-col justify-center items-start">
                <PageHeader title={props.page.name} pageType="" />
                {/* <BlocksHolder pageId={props.page.id} startBlocks={props.blocks} /> */}
              </div>
              <PageInfo page={props.page} />
            </div>
          </Scrollable>
        </Allotment.Pane>
        <Allotment.Pane
          snap
          minSize={80}
          maxSize={480}
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
    <>
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          {children}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation="vertical">
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </>
  );
}