//* Libraries imports
import { useState, type RefObject } from "react";

//* Hooks imports
import useDidMountEffect from "../common/useDidMountEffect";

//* EditorJS imports
import type EditorJS from "@editorjs/editorjs";
import type { OutputData } from "@editorjs/editorjs";

/**
 * @description This hook is used to load the editorjs library and initialize the editor
 * @type {RefObject<HTMLDivElement>} editorContainerRef - The ref of the div where the editor will be rendered
 * @type {string} pageId - The id of the page to load the content
 * @type {string = "editorjs"} id - The id of the div where the editor will be rendered. Default value is "editorjs"
 * @returns @type {object} - The editor container ref and the editor instance
 */

export default function useEditorJs(
  editorContainerRef: RefObject<HTMLDivElement>,
  pageId: string,
  id = "editorjs"
) {
  const [isEditorLoaded, setIsEditorLoaded] = useState<boolean>(false);
  const [isContentLoaded, setIsContentLoaded] = useState<boolean>(false);
  const [editor, setEditor] = useState<EditorJS | null>(null);

  /**
   * @description This function is used to load the editorjs library and initialize the editor
   */
  const startEditor = async () => {
    if (editorContainerRef.current && !editorContainerRef.current.firstChild) {
      const initialContent = await loadPageContent(pageId);
      const EditorJS = (await import("@editorjs/editorjs")).default;

      if (isEditorLoaded) return;
      const editor = new EditorJS({
        holder: id,
        placeholder: "Start Editing",
        data: initialContent || undefined,
      });

      setEditor(editor);
      setIsEditorLoaded(true);
      setIsContentLoaded(true);
    }
  };

  useDidMountEffect(() => {
    if (typeof window !== "undefined" && !isEditorLoaded) {
      setIsEditorLoaded(true);
      startEditor();
    }
  });

  return { editorContainerRef, editor, isEditorLoaded, isContentLoaded };
}

/**
 * @description This function is used to load the page content from the server
 */
async function loadPageContent(pageId: string): Promise<OutputData | null> {
  const res: OutputData = {
    time: 1681014078524,
    blocks: [
      {
        id: "bXYij3_E-8",
        type: "paragraph",
        data: {
          text: "Havia aqueles que eram fracos, e aqueles que eram fortes o suficiente para não serem fracos",
        },
      },
    ],
    version: "2.26.5",
  };

  //after 3 second...
  const content = new Promise<OutputData>((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, 3000);
  });

  const response = await content;

  if (response) return response;
  return null;
}
