//* Libraries imports
import type { ReactNode, UIEvent } from 'react';
import * as ScrollArea from "@radix-ui/react-scroll-area";


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
        className="relative flex flex-col w-full h-full"
        onScroll={props.onScroll}
      >
        <div className='relative flex flex-col items-center justify-start w-full h-full bg-neutral-950'>
          {props.children}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex select-none h-full touch-none px-1 transition-all bg-neutral-800 hover:bg-neutral-700 relative hover:px-1.5 z-10"
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