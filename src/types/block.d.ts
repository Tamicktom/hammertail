export type BlockTypes = "p" | "h1" | "h2" | "h3" | "h4" | "img";

export type BlockProps = {
  id: string;
  type: BlockTypes;
};

export type BlockContent = {
  content: string;
};

export const classes = {
  p: "p-1 border-b border-gray-200 text-base bg-red-100 mt-1",
  h1: "text-2xl font-bold",
  h2: "text-xl font-bold",
  h3: "text-lg font-bold",
  h4: "text-base font-bold",
  img: ""
};
