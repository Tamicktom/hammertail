//* Libraries imports
import { useState, useRef, type ReactNode, useEffect } from "react";
import { DotsSixVertical } from "@phosphor-icons/react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { DndProvider, DragObjectFactory, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Block {
  id: string;
  html: string;
  order: number;
}

export default function Edit() {
  const [blocks, setBlocks] = useState<Block[]>([{ id: crypto.randomUUID(), html: "Teste", order: 0 }]);
  const refs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    console.log(blocks);
  }, [blocks]);

  const addBlockAfter = (id: string) => {
    const newBlock: Block = { id: crypto.randomUUID(), html: "", order: 0 };
    setBlocks((prevBlocks) => {
      const index = prevBlocks.findIndex((block) => block.id === id);
      if (index === -1) return prevBlocks;
      const order = prevBlocks[index]?.order;
      if (order === undefined) return prevBlocks;
      newBlock.order = order + 1;
      const updatedBlocks = [
        ...prevBlocks.slice(0, index + 1),
        newBlock,
        ...prevBlocks.slice(index + 1),
      ];
      return updatedBlocks.map((block, i) => ({ ...block, order: i }));
    });
    setTimeout(() => {
      refs.current[newBlock.id]?.focus();
    }, 0);
  };

  const onBlockChange = (id: string, value: string) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => (block.id === id ? { ...block, html: value } : block))
    );
  };

  const deleteBlock = (id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  const focusAndMoveCaretToEnd = (element: HTMLElement) => {
    element.focus();
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection && element.childNodes.length > 0) {
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    const currentBlockIndex = blocks.findIndex((block) => block.id === id);
    const isContentEmpty = blocks[currentBlockIndex]?.html.trim() === "";

    if (e.key === "Enter") {
      e.preventDefault();
      addBlockAfter(id);
    } else if (e.key === "Backspace" && isContentEmpty && currentBlockIndex !== 0) {
      e.preventDefault();
      deleteBlock(id);
      setTimeout(() => {
        if (refs.current && blocks && blocks[currentBlockIndex - 1]) {
          // @ts-ignore
          focusAndMoveCaretToEnd(refs.current[blocks[currentBlockIndex - 1].id]);
        }
      }, 0);
    }
  };

  const moveBlock = (dragOrder: number, hoverOrder: number) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks.slice();
      const draggedBlock = updatedBlocks.find((block) => block.order === dragOrder);
      const hoverBlock = updatedBlocks.find((block) => block.order === hoverOrder);

      if (!draggedBlock || !hoverBlock) return prevBlocks;

      draggedBlock.order = hoverOrder;
      hoverBlock.order = dragOrder;

      return updatedBlocks.sort((a, b) => a.order - b.order);
    });
  };


  return (
    <div className="bg-tertiary-800 w-full h-screen flex justify-center pt-12">
      <div className="w-full max-w-7xl">
        <DndProvider backend={HTML5Backend}>
          <div className="w-full flex flex-col justify-center items-center">
            {blocks.map((block) => (
              <DraggableBlock
                key={block.id}
                block={block}
                moveBlock={moveBlock}
                >
                <ContentEditable
                  key={block.id}
                  html={block.html}
                  onChange={(e: ContentEditableEvent) => onBlockChange(block.id, e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e, block.id)}
                  className="w-full text-white text-base focus:outline-tertiary-700 ring-0 rounded shadow-none outline-none border-none focus:border-tertiary-700 active:border-tertiary-700 px-2 py-1"
                  innerRef={(node: HTMLElement) => {
                    refs.current[block.id] = node;
                  }}
                />
              </DraggableBlock>
            ))}
          </div>
        </DndProvider>
      </div>
    </div>
  );
}

interface DraggableBlockProps {
  block: Block;
  moveBlock: (dragOrder: number, hoverOrder: number) => void;
  children: ReactNode;
}

type DragCollect = {
  isDragging: boolean;
};

type DragItem = {
  type: string;
  id: string;
  order: number;
};

function DraggableBlock({ block, moveBlock, children }: DraggableBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [, drop] = useDrop({
    accept: "block",
    hover(item: DragItem, monitor) {
      if (!ref.current) return;

      const dragOrder = item.order;
      const hoverOrder = block.order;

      if (dragOrder === hoverOrder) return;

      moveBlock(dragOrder, hoverOrder);
      item.order = hoverOrder;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag<DragItem, never, DragCollect>({
    type: "block",
    item: (() => ({ type: "block", id: block.id, order: block.order })) as DragObjectFactory<DragItem>,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
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
        className="pl-2 w-full flex flex-row gap-1"
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