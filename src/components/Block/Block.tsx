//* Libraries imports
import ContentEditable from 'react-contenteditable';
import { useRef, useState, useEffect } from 'react';


//* Local imports
import { classes, getBlocksContent } from './utils';
import useDebounce from '../../hooks/useDebounce';
import { saveBlock } from '../../utils/blockUtils';
import type { BlockProps } from '../../types/block';
import { ImageBlock } from '../ImageBlock/ImageBlock';
import { TodoBlock } from '../TodoBlock/TodoBlock';
import { validateHeaderValue } from 'http';

export const Block = ({ id, type }: BlockProps) => {
  const [content, setContent] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const debouncedContent = useDebounce(content, 1000);
  const style = classes[type];

  const verifyComponentToRender = (type: string) => {
    if (type == "img") return <ImageBlock ImgUrl='http://localhost:3000/images/1671670375746_charmander.png' />
    if (type == "todo") return <TodoBlock TodoText={content} IsChecked={false}/>

    return <ContentEditable
      className={style}
      id={id}
      innerRef={useRef(null)} // innerRef is a reference to the inner div
      html={content} // innerHTML of the editable div
      disabled={false} // use true to disable editing
      onChange={(e) => console.log(JSON.stringify(e.target.value))} // handle innerHTML change
      tagName={type} // Use a custom HTML tag (uses a div by default)
    />

  }

  useEffect(() => {
    const handleLoadContent = async () => {
      const contentFromApi = await getBlocksContent(id);
      if (contentFromApi)
        setContent(contentFromApi.content);
    };
    handleLoadContent();
  }, []);

  useEffect(() => {
    saveBlock(id, { content: debouncedContent });
    console.info('saving....................');
  }, [debouncedContent]);

  useEffect(() => {
    if (content !== newContent) {
      setContent(newContent);
    }
  }, [newContent]);

  return (
    <div className='w-full'>
      {
       verifyComponentToRender(type)

      }

    </div>

  );

};

