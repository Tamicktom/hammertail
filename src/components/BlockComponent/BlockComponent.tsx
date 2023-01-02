//* Libraries imports
import type { Block } from '@prisma/client';

//* Blocks imports
import { ImageBlock } from './Blocks/ImageBlock/ImageBlock';
import { TodoBlock } from './Blocks/TodoBlock/TodoBlock';
import { Heading } from './Blocks/Heading/Heading';
import { Paragraph } from './Blocks/Paragraph/Paragraph';

type Props = {
  block: Block,
}

export const BlockComponent = ({ block }: Props) => {
  return (
    <div className='w-full'>
      {
        block.blockType == "img"
          ? <ImageBlock ImgUrl='http://localhost:3000/images/1671670375746_charmander.png' />
          : block.blockType == "todo"
            ? <TodoBlock TodoText={""} IsChecked={false} />
            : block.blockType == "h1" || block.blockType == "h2" || block.blockType == "h3"
              ? <Heading block={block} />
              : <Paragraph block={block} />
      }
    </div>

  );

};

