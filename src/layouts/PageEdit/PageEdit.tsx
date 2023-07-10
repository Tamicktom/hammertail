//* Libraries imports
import { useState, type ReactNode, type UIEvent } from 'react';
import { Allotment, LayoutPriority } from "allotment";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import colors from 'tailwindcss/colors';

//* Component imports
import { Navbar } from "../../components/specific/Navbar/Navbar";
const PageHeader = dynamic(() => import('../../components/specific/PageEditComponents/PageHeader'));
const PageInfo = dynamic(() => import('../../components/specific/PageEditComponents/PageInfo'));
const Sidebar = dynamic(() => import("../../components/specific/Sidebar/Sidebar"));
const TextEditorWraper = dynamic(() => import('../../components/TextEditor/TextEditorWraper'));
const PageBackgroundImage = dynamic(() => import('../../components/specific/PageBackgroundImage'));
const PageEditMenu = dynamic(() => import('../../components/specific/PageEditMenu'), { ssr: false });

//* Hooks imports
import usePage from "../../hooks/queries/usePage";

export default function PageEdit() {
  const [sidebarCollapse, setSidebarCollapse] = useState(true);
  const [bgColor, setBgColor] = useState<[number, number, number]>([0, 0, 0]);

  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className="w-screen h-screen bg-neutral-800 flex flex-row justify-start items-center">
      <Allotment>
        <Allotment.Pane>
          <Scrollable
            bgColor={bgColor}
          >
            {/* background */}
            <PageBackgroundImage
              color={bgColor}
              setColor={setBgColor}
            />

            <Navbar
              worldId={page.data?.worldId || ""}
              isSidebarCollapsed={sidebarCollapse}
              setSidebarCollapse={setSidebarCollapse}
            />

            <div className='w-full max-w-7xl flex flex-col pt-28'>
              {/* content */}
              <div
                className='flex p-4 flex-col min-h-screen relative items-center w-full rounded-2xl bg-neutral-900 z-10 border-2 border-neutral-600 pb-48 transition-all'
                style={{
                  borderColor: `hsl(${bgColor[0]}, ${bgColor[1]}%, ${bgColor[2] * 2}%)`,
                }}
              >
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
            {/* <div className='flex justify-center items-center w-full sticky left-0 bottom-0 h-28 z-10'>
              <div className='w-full max-w-7xl h-full bg-amber-600'>
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
          <Sidebar collapsed={sidebarCollapse} />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

type ScrollableProps = {
  children: ReactNode;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
  bgColor?: [number, number, number];
}

function Scrollable(props:
  ScrollableProps) {

  return (
    <ScrollArea.Root
      className="w-full min-h-screen h-full overflow-hidden"
      scrollHideDelay={750}
    >
      <ScrollArea.Viewport
        className="w-full h-full relative flex flex-col"
        onScroll={props.onScroll}
      >
        <div
          className='w-full h-full relative flex flex-col bg-neutral-950 justify-start items-center transition-all'
          style={{
            backgroundColor: props.bgColor ? `hsl(${props.bgColor[0]}, ${props.bgColor[1]}%, ${props.bgColor[2]}%)` : colors.neutral[800],
          }}
        >
          {props.children}
        </div>
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