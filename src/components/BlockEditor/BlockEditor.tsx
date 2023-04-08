//* Libraries imports
import { useState, useRef, type KeyboardEvent, useEffect, Fragment } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//* Types imports
import type { Block } from "../../types/block";

//* Components imports
import DropLine from "./subComponents/DropLine";
import DraggableBlock from "./subComponents/DraggableBlock";

//* Custom hooks
import useDebounce from "../../hooks/common/useDebounce";

type BlockEditorProps = {

}

export default function BlockEditor() {
  const [blocks, setBlocks] = useState<Block[]>([{ id: crypto.randomUUID(), html: "Teste", order: 0 }]);
  const [linePosition, setLinePosition] = useState<number | null>(null);
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

  const focusAndMoveCaretToEnd = (element: HTMLElement | undefined) => {
    if (!element) return;
    element.focus();
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection && element.childNodes.length > 0) {
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      element.focus();
    }
  };

  const isCaretAtStart = (element: HTMLElement | undefined) => {
    if (!element) return false;
    const selection = window.getSelection();
    if (!selection || !element.contains(selection.anchorNode)) return false;
    return selection.anchorOffset === 0;
  };

  const isCaretAtEnd = (element: HTMLElement | undefined) => {
    if (!element) return false;
    const selection = window.getSelection();
    if (!selection || !element.contains(selection.anchorNode)) return false;
    console.log(selection.anchorOffset, element.textContent?.length);
    return selection.anchorOffset === element.textContent?.length;
  };

  const handleKeyDown = (e: KeyboardEvent, id: string) => {
    const currentBlockIndex = blocks.findIndex((block) => block.id === id);
    const isContentEmpty = blocks[currentBlockIndex]?.html.trim() === "";

    if (e.key === "Enter" && e.shiftKey) { // Adicione esta condição
      e.preventDefault();
      const contentEditableElement = refs.current[id];
      if (!contentEditableElement) return;

      const selection = window.getSelection();
      if (!selection) return;
      const range = selection.getRangeAt(0);

      // Cria um novo elemento <br> e insere no local do cursor
      const brNode = document.createElement("br");
      range.deleteContents();
      range.insertNode(brNode);
      range.setStartAfter(brNode);
      range.setEndAfter(brNode);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      // Atualiza o estado do bloco
      onBlockChange(id, contentEditableElement.innerHTML);
    } else if (e.key === "Enter") {
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
    } else if (e.key === "ArrowUp" && isCaretAtStart(refs.current[id])) {
      e.preventDefault();
      if (currentBlockIndex > 0 && blocks[currentBlockIndex - 1] && refs.current) {
        const block = blocks[currentBlockIndex - 1];
        if (!block) return;
        focusAndMoveCaretToEnd(refs.current[block.id]);
      }
    } else if (e.key === "ArrowDown" && isCaretAtEnd(refs.current[id])) {
      e.preventDefault();
      if (currentBlockIndex < blocks.length - 1 && blocks[currentBlockIndex + 1] && refs.current) {
        const block = blocks[currentBlockIndex + 1];
        if (block?.id) {
          focusAndMoveCaretToEnd(refs.current[block.id]);
        }
      }
    }
  };

  const moveBlock = (dragOrder: number, hoverOrder: number) => {
    setLinePosition(hoverOrder);
    setBlocks((prevBlocks) => {
      const draggedBlock = prevBlocks.find((block) => block.order === dragOrder);

      if (!draggedBlock) return prevBlocks;

      const updatedBlocks = prevBlocks
        .filter((block) => block.order !== dragOrder)
        .map((block) =>
          dragOrder < hoverOrder
            ? block.order > dragOrder && block.order <= hoverOrder
              ? { ...block, order: block.order - 1 }
              : block
            : block.order >= hoverOrder && block.order < dragOrder
              ? { ...block, order: block.order + 1 }
              : block
        );

      const index = updatedBlocks.findIndex(
        (block) => block.order === (dragOrder < hoverOrder ? hoverOrder - 1 : hoverOrder)
      );

      return [
        ...updatedBlocks.slice(0, index + 1),
        { ...draggedBlock, order: hoverOrder },
        ...updatedBlocks.slice(index + 1),
      ];
    });
  };

  return (
    <div className="w-full flex justify-center pt-12">
      <div className="w-full max-w-7xl">
        <DndProvider backend={HTML5Backend}>
          <div className="w-full flex flex-col justify-center items-center">
            {blocks.map((block, index) => (
              <Fragment key={block.id}>
                {linePosition === index && <DropLine />}
                <DraggableBlock
                  block={block}
                  moveBlock={moveBlock}
                  contentEditableRef={refs.current[block.id] || null}
                  setLinePosition={setLinePosition}
                >
                  <ContentEditable
                    key={block.id}
                    html={block.html}
                    onChange={(e: ContentEditableEvent) => onBlockChange(block.id, e.target.value)}
                    onKeyDown={(e: KeyboardEvent) => handleKeyDown(e, block.id)}
                    className="w-full text-white text-base focus:outline-tertiary-700 ring-0 rounded shadow-none outline-none border-none focus:border-tertiary-700 active:border-tertiary-700 px-2 py-1"
                    innerRef={(node: HTMLElement) => {
                      refs.current[block.id] = node;
                    }}
                  />
                </DraggableBlock>
              </Fragment>
            ))}
          </div>
        </DndProvider>
      </div>
    </div>
  );
}

