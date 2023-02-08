//* Libraries imports
import { useRef, useState, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';

//* Type, utils imports
import { classes } from '../../utils';
import useDebounce from '../../../../hooks/useDebounce';
import type { Block } from '@prisma/client';

type Props = {
  block: Block,
}

export const Heading = ({ block }: Props) => {
  const style = classes[block.blockType as keyof typeof classes];
  const [content, setContent] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const debouncedContent = useDebounce(content, 1250);
  const reference = useRef(null);

  useEffect(() => {
    const handleLoadContent = async () => {
      await fetch("/api/block", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId: block?.pageId,
          comand: "get",
          blockId: block?.id,
          blockType: block?.blockType,
        }),
      })
        .then((res) => res.json())
        .then((data) => setNewContent(data.content));
    };
    handleLoadContent();
  });

  useEffect(() => {
    if (debouncedContent) {
      const handleSaveContent = async () => {
        await fetch("/api/block", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageId: block.pageId,
            comand: "update",
            blockId: block.id,
            content: debouncedContent === "" ? " " : debouncedContent,
            blockType: block.blockType,
          }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      };
      handleSaveContent();
    }
  }, [debouncedContent]);

  useEffect(() => {
    if (content !== newContent) {
      setContent(newContent);
    }
  }, [newContent]);

  return (
    <ContentEditable
      className={style}
      id={block.id}
      innerRef={reference} // innerRef is a reference to the inner div
      html={content} // innerHTML of the editable div
      disabled={false} // use true to disable editing
      onChange={(e) => { setNewContent(e.target.value) }} // handle innerHTML change
      tagName={block.blockType} // Use a custom HTML tag (uses a div by default)
    />
  );
};
