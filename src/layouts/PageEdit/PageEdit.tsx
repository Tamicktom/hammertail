//* Libraries imports
import { useState, type ReactNode, type UIEvent, } from 'react';
import { Allotment, LayoutPriority } from "allotment";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { Page, Block, PageType } from '@prisma/client';

//* Component imports
import { Navbar } from "../../components/specific/Navbar/Navbar";
import { PageHeader } from "../../components/specific/PageEditComponents/PageHeader";
import { PageInfo } from "../../components/specific/PageEditComponents/PageInfo";
import { Sidebar } from "../../components/specific/Sidebar/Sidebar";

import TextEditorWraper from '../../components/TextEditor/TextEditorWraper';

//* Hooks imports
import usePage from "../../hooks/queries/usePage";

type Props = {
  pageId: string;
}

export default function PageEdit(props: Props) {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);
  const [navBarCollapse, setNavBarCollapse] = useState(false);

  const page = usePage(props.pageId);

  const collapseNavBar = (event:
    UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    if (scrollTop > 120) {
      setNavBarCollapse(true);
    } else {
      setNavBarCollapse(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-neutral-800 flex flex-row justify-start items-center">
      <Allotment>
        <Allotment.Pane>
          <Scrollable
            onScroll={collapseNavBar}
          >
            <Navbar
              worldId={page.data?.worldId || ""}
              collapsed={navBarCollapse}
              isSidebarCollapsed={sidebarCollapse}
              setSidebarCollapse={setSidebarCollapse}
            />

            <div className="h-40 w-full" />
            <div className="w-full h-full flex flex-row justify-center items-start gap-2">
              <div className="w-full max-w-5xl flex flex-col justify-center items-start mb-80">
                <PageHeader
                  title={page.data?.name}
                  pageType={page.data?.PageType}
                />

                {
                  page.data
                    ? <TextEditorWraper page={page.data} />
                    : <></>
                }

              </div>
              <PageInfo page={page.data} />
            </div>
          </Scrollable>
        </Allotment.Pane>
        <Allotment.Pane
          minSize={80}
          maxSize={320}
          visible={!sidebarCollapse}
          priority={LayoutPriority.High}
        >
          {
            page.data
              ? <Sidebar
                worldId={page.data?.worldId}
                collapsed={sidebarCollapse}
              />
              : <></>
          }
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

type ScrollableProps = {
  children:
  ReactNode;
  onScroll?:
  (event:
    UIEvent<HTMLDivElement>) => void;
}

function Scrollable(props:
  ScrollableProps) {

  return (
    <ScrollArea.Root
      className="w-full h-full overflow-hidden"
      scrollHideDelay={750}
    >
      <ScrollArea.Viewport
        className="w-full h-full relative"
        onScroll={props.onScroll}
      >
        {props.children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar

        orientation="vertical"
        className="flex select-none h-full touch-none px-1 transition-all bg-neutral-800 hover:bg-neutral-700 relative hover:px-1.5"
      >
        <ScrollArea.Thumb
          className="bg-neutral-600 flex-1 rounded absolute left-0 top-0"
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