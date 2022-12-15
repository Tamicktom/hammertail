import ContentEditable from 'react-contenteditable';
import { useRef, createRef, useState, useEffect } from 'react';
import { classes, getBlocksContent } from './utils';
import type { BlockProps } from '../../types/block';

export const Block = ({ id, type }: BlockProps) => {
  const [content, setContent] = useState<string>('');
  const style = classes[type];

  useEffect(() => {
    const handleLoadContent = async () => {
      const contentFromApi = await getBlocksContent(id);
      if (contentFromApi)
        setContent(contentFromApi.content);
    };
    handleLoadContent();
  }, []);

  return (
    <>
      <ContentEditable
        className={style}
        id={id}
        innerRef={useRef(null)} // innerRef is a reference to the inner div
        html={content} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={(e) => console.log(JSON.stringify(e.target.value))} // handle innerHTML change
        tagName={type} // Use a custom HTML tag (uses a div by default)
      />
    </>
  );
};