import ContentEditable from 'react-contenteditable';
import { useRef, createRef } from 'react';
import { classes } from './utils';
import type { BlockProps } from './utils';

export const Block = ({ id, type, content }: BlockProps) => {

  const style = classes[type];

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
