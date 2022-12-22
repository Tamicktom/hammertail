import type { BlockContent } from "../../types/block";

export const classes = {
  p: "py-1 px-2 text-white text-base",
  h1: "py-2 px-2 text-white text-2xl font-bold",
  h2: "py-1 px-2 text-white text-xl font-bold",
  h3: "py-1 px-2 text-white text-lg font-bold",
  h4: "py-1 px-2 text-white text-base font-bold",
  img: "",
};

type TmpContent = {
  [key: string]: BlockContent;
};

export const getBlocksContent = async (blockId: string) => {
  const content: TmpContent = {
    "1": { content: "Eu sou o primeiro texto" },
    "2": { content: "Eu sou o segundo texto" },
    "3": { content: "Eu sou o terceiro texto" },
    "4": {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue luctus leo, ut efficitur felis tristique ac. Vivamus in euismod nisi. Fusce sed mauris ut nisi tempor aliquam at eu odio. Integer eget tincidunt enim, quis pellentesque justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod gravida odio, eu sagittis ante pharetra vitae. Mauris tempor turpis sed metus consequat eleifend. ",
    },
    "5": {
      content:
        "Sed at nulla magna. Maecenas pharetra nisl eu est fringilla vestibulum. Nulla nec nisl id eros scelerisque tincidunt. Nunc eleifend tortor ut metus vulputate lacinia. In hac habitasse platea dictumst. Duis suscipit lorem in dapibus rhoncus. Proin ligula lacus, faucibus eget iaculis sed, pellentesque at sem. Duis egestas eget sapien a placerat. Quisque ultricies nunc sed mauris blandit dictum. Donec vehicula gravida elit, vitae pulvinar nunc sodales at. Vestibulum sed odio iaculis, dictum diam ac, tristique mi. Aenean egestas consequat porta. Nunc quis posuere dolor. ",
    },
    "6": {
      content:
        "Donec sit amet aliquam tortor, sed ornare lacus. Integer ut mauris molestie, sodales mi ut, elementum urna. Curabitur eu dictum risus. Cras eget nulla orci. Maecenas augue nulla, semper vitae faucibus et, eleifend bibendum est. Mauris vitae nunc semper, feugiat magna non, consectetur mauris. Aenean malesuada pulvinar odio ac efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. ",
    
    },
  "7":{

    content:"/images/1671576095511_197.png"

  }
  };


  return content[blockId];
};