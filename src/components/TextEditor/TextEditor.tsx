//* Libraries imports
import { type BlockNoteEditor, type PartialBlock, type BlockSchema } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

type Props = {
  initialContent: PartialBlock<BlockSchema>[];
  onEditorChange: (editor: BlockNoteEditor) => void;
}

export default function TextEditor(props: Props) {

  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: props.initialContent as any, // TODO: fix type
    onEditorContentChange: props.onEditorChange,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme="dark"
    />
  );
}