//* Libraries imports
import { useRef, useState, useEffect, ReactNode } from "react";
import { useDrag, useDrop, DragObjectFactory } from "react-dnd";
import { DotsSixVertical } from "@phosphor-icons/react";

//* Types imports
import type { Block } from "../../../types/block";


interface DraggableBlockProps {
  block: Block;
  moveBlock: (dragOrder: number, hoverOrder: number) => void;
  children: ReactNode;
  contentEditableRef: HTMLElement | null;
  setLinePosition: (position: number | null) => void;
}

type DragCollect = {
  isDragging: boolean;
};

type DragItem = {
  type: string;
  id: string;
  order: number;
};

export default function DraggableBlock({ block, moveBlock, children, contentEditableRef, setLinePosition }: DraggableBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragEnabled, setIsDragEnabled] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [, drop] = useDrop({
    accept: "block",
    hover(item: DragItem) {
      if (!ref.current) return;

      const dragOrder = item.order;
      const hoverOrder = block.order;

      if (dragOrder === hoverOrder) return;

      moveBlock(dragOrder, hoverOrder);
      item.order = hoverOrder;
    },
  });

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (isMouseDownOnContentEditable(event, contentEditableRef)) {
        setIsDragEnabled(false);
      } else {
        setIsDragEnabled(true);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [contentEditableRef]);

  const [{ isDragging }, drag, preview] = useDrag<DragItem, never, DragCollect>({
    canDrag: () => isDragEnabled,
    type: "block",
    item: (() => {
      return {
        type: "block",
        id: block.id,
        order: block.order,
      };
    }) as DragObjectFactory<DragItem>,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      setLinePosition(null);
      if (!monitor.didDrop()) {
        item.order = block.order;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={preview}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="w-full flex justify-center items-center flex-col"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <div
        className="w-full flex flex-row gap-1"
        ref={ref}
      >
        <DotsSixVertical
          className="w-7 h-7 text-gray-500"
          style={{
            cursor: "grab",
            opacity: isMouseOver ? 1 : 0,
          }}
        />
        {children}
      </div>
    </div>
  );
};

//* Util functions

const isMouseDownOnContentEditable = (event: MouseEvent, contentEditableRef: HTMLElement | null) => {
  if (!contentEditableRef) return false;
  const target = event.target as HTMLElement;
  return contentEditableRef.contains(target);
};