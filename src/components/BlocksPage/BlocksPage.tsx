//* Libraries imports
import { useState, useEffect } from 'react';
import { Cake, Skull } from 'phosphor-react';

//* Component imports
import { Block } from "../Block/Block";
import { BlockProps } from "../../types/block";

export const BlocksPage = () => {
  const [blocks, setBlocks] = useState<BlockProps[]>([]);

  const handleLoadBlocks = async () => {
    const blocksFromApi = await getBlocksFromApi();
    setBlocks(blocksFromApi);
  };

  useEffect(() => {
    handleLoadBlocks();
  }, []);

  return (
    <div className="flex flex-row items-start justify-center w-full h-full px-4 py-20 overflow-y-scroll">

      {/* blocks */}
      <div className="flex flex-col w-full gap-8 p-2">

        <div className='flex flex-col w-full gap-2 bg-slate-600'>
          <span className='font-bold text-white'>Characters</span>
          <h1 className="text-5xl font-bold text-white">Ana Magister</h1>
        </div>

        <div className='flex flex-col w-full gap-1 bg-slate-700'>
          {blocks.map((block) => (
            <Block
              key={block.id}
              id={block.id}
              type={block.type}
            />
          ))}
        </div>
      </div>


      {/* character info */}
      <div className="p-2 w-72">
        <div className='flex items-center justify-center w-full'>
          <img
            src="https://i.pinimg.com/564x/bb/14/18/bb1418129cfc0b35f874d249bb5ff9e6.jpg"
            alt="Imagem do personagem"
            className="w-full rounded-lg"
            loading='lazy'
          />
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='w-full'>
            <span className='text-lg font-bold text-white'>Mage of Cats</span>
          </div>
          <div className='flex flex-col w-full gap-2'>
            <div className='flex flex-row w-full gap-2'>
              <Cake size={24} className="text-white" />
              <span className='text-base text-white'>12/02/3652</span>
            </div>
            <div className='flex flex-row w-full gap-2'>
              <Skull size={24} className="text-white" />
              <span className='text-base text-white'>31/09/3698</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getBlocksFromApi = async () => {
  const blocks: BlockProps[] = [
    { id: "1", type: "h1" },
    { id: "2", type: "h2" },
    { id: "3", type: "h3" },
    { id: "4", type: "p" },
    { id: "5", type: "p" },
    { id: "6", type: "p" },
  ];
  return blocks;
};

