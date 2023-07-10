//* Libraries imports
import type { ReactNode, UIEvent } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';


type ScrollableProps = {
  children: ReactNode;
  onScroll?: (event: UIEvent<HTMLDivElement>) => void;
}

export default function Scrollable(props:
  ScrollableProps) {

  return (
    <ScrollArea.Root
      className="w-full h-full overflow-hidden"
      scrollHideDelay={750}
    >
      <ScrollArea.Viewport
        className="w-full h-full relative flex flex-col"
        onScroll={props.onScroll}
      >
        <div className='w-full h-full relative flex flex-col bg-neutral-950 justify-start items-center'>
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