//* Libraries imports
import { useState, useEffect } from 'react';
import { Plus } from 'phosphor-react';

//* Component imports
import { BlockComponent } from "../../BlockComponent/BlockComponent";
import SelectMenu from '../../specific/SelectMenu/SelectMenu';

//* custom hooks
import { useMousePosition } from '../../../hooks/mouse';
import type { Block } from '@prisma/client';

type Props = {
  pageId: string;
  startBlocks: Block[];
}
export const BlocksHolder = ({ pageId, startBlocks }: Props) => {
  const [blocks, setBlocks] = useState<Block[]>(startBlocks);
  const spawnPosition = useMousePosition();
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleFirstAddBlock = async () => {
    const newBlock = await fetch('/api/block', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageId,
        comand: 'create',
        type: 'p',
      }),
    }).then((res) => res.json());
    console.log(newBlock);

    // setBlocks([newBlock]);
  };

  const handleAddBlock = (index: number, block: Block) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 0, block);
    setBlocks(newBlocks);
  }

  return (
    <div className="flex flex-row items-start justify-center w-full h-full px-4 py-20 overflow-y-scroll">

      <SelectMenu
        isOpen={isMenuOpen}
        spawnPosition={menuPosition}
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
        onAddBlock={handleAddBlock}
      />

      {/* blocks */}
      <div className="flex flex-col w-full gap-8 p-2">
        <div className='flex flex-col w-full bg-slate-700 gap-1'>
          {
            blocks.length > 0
              ? blocks.map((block, index) => (
                <div key={index} className='flex flex-row w-full justify-start items-start'>
                  <button
                    onClick={() => {
                      setMenuPosition(spawnPosition);
                      setIsMenuOpen(true)
                    }}
                    onMouseEnter={() => setMenuPosition(spawnPosition)}
                    onMouseLeave={() => setIsMenuOpen(false)}
                    className='mt-2 text-white rounded-lg hover:bg-slate-900 p-1'
                  >
                    <Plus size={24} />
                  </button>
                  <BlockComponent block={block} />
                </div>
              ))
              : <>
                <div className='flex flex-col w-full justify-start items-start'>
                  <p>Não há blocos, adicione o primeiro</p>
                  <button
                    onClick={handleFirstAddBlock}
                    className='mt-2 text-white rounded-lg hover:bg-slate-900 p-1'
                  >
                    <span>Adicionar</span>
                  </button>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  );
};

