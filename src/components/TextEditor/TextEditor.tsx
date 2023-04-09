//* Libraries imports
import { BlockNoteEditor, type PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

type Props = {
  initialContent: PartialBlock[] | null;
  onEditorChange: (editor: BlockNoteEditor) => void;
}

export default function TextEditor(props: Props) {

  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: props.initialContent || undefined,
    onEditorContentChange: props.onEditorChange
  });

  return (
    <BlockNoteView
      editor={editor}
    />
  );
}