
import { Block } from "../Block/Block";
import { useState, useEffect } from 'react';
import { BlockProps } from "../Block/utils";

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
      {blocks.map((block) => (
        <Block
          key={block.id}
          id={block.id}
          type={block.type}
          content={block.content} />
      ))}
    </div>
  );
};

const getBlocksFromApi = async () => {
  const blocks: BlockProps[] = [
    { id: "1", type: "h1", content: "Hello World" },
    { id: "3", type: "h2", content: "Hello World" },
    { id: "5", type: "h3", content: "Hello World" },
    { id: "2", type: "p", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget ultricies nisl nisl eget nisl." },
    { id: "4", type: "p", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget ultricies nisl nisl eget nisl." },
    { id: "6", type: "p", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquet nisl, eget ultricies nisl nisl eget nisl." },
  ];
  return blocks;
};

