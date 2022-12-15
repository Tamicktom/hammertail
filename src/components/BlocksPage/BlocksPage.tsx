
import { Block } from "../Block/Block";
import { useState, useEffect } from 'react';
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
    <div>
      <h1>Página com todos os blocos</h1>
      <div>
        {blocks.map((block) => (
          <Block
            key={block.id}
            id={block.id}
            type={block.type}
          />
        ))}
      </div>
    </div>
  );
};

const getBlocksFromApi = async () => {
  const blocks: BlockProps[] = [
    { id: "1", type: "h1" },
    { id: "3", type: "h2" },
    { id: "5", type: "h3" },
    { id: "2", type: "p" },
    { id: "4", type: "p" },
    { id: "6", type: "p" },
  ];
  return blocks;
};

