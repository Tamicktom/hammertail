import type { BlockContent } from "../../types/block";

export const classes = {
  p: "p-1 border-b border-gray-200 text-base bg-red-100 mt-1",
  h1: "text-2xl font-bold",
  h2: "text-xl font-bold",
  h3: "text-lg font-bold",
  h4: "text-base font-bold",
};

type TmpContent = {
  [key: string]: BlockContent;
}

export const getBlocksContent = async (blockId: string) => {
  const content: TmpContent = {
    "1": { content: "Eu sou o primeiro texto" },
    "2": { content: "Eu sou o segundo texto" },
    "3": { content: "Eu sou o terceiro texto" },
    "4": { content: "Eu sou o quarto texto" },
    "5": { content: "Eu sou o quinto texto" },
    "6": { content: "Eu sou o sexto texto" },
  };

  return content[blockId];
};
