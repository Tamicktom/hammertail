//* Libraries imports
import { BlockNoteEditor, type PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

type Props = {
  initialContent: PartialBlock[];
  onEditorChange: (editor: BlockNoteEditor) => void;
}

export default function TextEditor(props: Props) {

  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: props.initialContent,
    onEditorContentChange: props.onEditorChange,
    theme: "dark"
  });

  return (
    <BlockNoteView
      editor={editor}
    />
  );
}