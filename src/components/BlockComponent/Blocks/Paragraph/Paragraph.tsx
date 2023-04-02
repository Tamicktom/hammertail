//* Libraries imports
import { createRef } from 'react';
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable';
// import { TextBolder, TextItalic, TextUnderline } from "@phosphor-icons/react"

//* Type, utils imports
import { classes } from '../../utils';
import { useParagraph } from '../../../../hooks/specific/useBlockHooks';
import type { Block } from '@prisma/client';

type Props = {
  block: Block,
}

export const Paragraph = ({ block }: Props) => {
  const style = classes[block.blockType as keyof typeof classes];
  // const [content, setContent] = useState<string>('');
  // const [newContent, setNewContent] = useState<string>('');
  // const debouncedContent = useDebounce(content, 1250);
  const ref = createRef<HTMLDivElement>();

  const {
    loading,
    error,
    content,
    setContent,
    newContent,
    setNewContent,
    isEditing,
    setIsEditing
  } = useParagraph(block);

  // //* Load content
  // useEffect(() => {
  //   const handleLoadContent = async () => {
  //     await fetch("/api/block", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         pageId: block?.pageId,
  //         comand: "get",
  //         blockId: block?.id,
  //         blockType: block?.blockType,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setNewContent(data.content));
  //   };
  //   handleLoadContent();
  // });

  // //* Save content
  // useEffect(() => {
  //   if (debouncedContent) {
  //     const handleSaveContent = async () => {
  //       await fetch("/api/block", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           pageId: block.pageId,
  //           comand: "update",
  //           blockId: block.id,
  //           content: debouncedContent === "" ? " " : debouncedContent,
  //           blockType: block.blockType,
  //         }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => console.log(data))
  //         .catch((err) => console.log(err));
  //     };
  //     handleSaveContent();
  //   }
  // }, [debouncedContent]);

  // useEffect(() => {
  //   if (content !== newContent) {
  //     setContent(newContent);
  //   }
  // }, [newContent]);

  const handleChange = (e: ContentEditableEvent) => {
    setContent(e.target.value);
  }

  return (
    <>
      {/* <div
        style={{
          height: isEditing ? '32px' : '0px',
          opacity: isEditing ? 1 : 0,
        }}
        className="flex flex-row gap-2 transition-all"
      >
        <button onClick={() => { formatSelection("bold") }}><TextBolder className='text-white w-8 h-8' /></button>
        <button onClick={() => { formatSelection("italic") }}><TextItalic className='text-white w-8 h-8' /></button>
        <button onClick={() => { formatSelection("underline") }}><TextUnderline className='text-white w-8 h-8' /></button>
      </div> */}
      <ContentEditable
        className={style}
        id={block.id}
        innerRef={ref} // innerRef is a reference to the inner div
        html={content} // innerHTML of the editable div
        disabled={false} // use true to disable editing
        onChange={handleChange} // handle innerHTML change
        tagName={block.blockType} // Use a custom HTML tag (uses a div by default)
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        spellCheck
      />
    </>
  );
};

type ExecCommandOption = "bold" | "copy" | "createLink" | "cut" | "decreaseFontSize" | "delete" | "fontName" | "fontSize" | "foreColor" | "hiliteColor" | "increaseFontSize" | "indent" | "insertHorizontalRule" | "insertHTML" | "insertImage" | "insertOrderedList" | "insertUnorderedList" | "insertParagraph" | "insertText" | "italic" | "justifyCenter" | "justifyFull" | "justifyLeft" | "justifyRight" | "outdent" | "paste" | "redo" | "removeFormat" | "selectAll" | "strikeThrough" | "subscript" | "superscript" | "underline" | "undo" | "unlink" | "useCSS" | "styleWithCSS";

const formatSelection = (option: ExecCommandOption) => {
  document.execCommand(option, false, '');
};