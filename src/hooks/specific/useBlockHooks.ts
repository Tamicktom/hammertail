//* Libraries imports
import { useState, useEffect } from "react";

//* Type imports
import type { Block } from "@prisma/client";

//* Custom hooks
import useDebounce from "../common/useDebounce";

/**
 * Hook to manage the paragraph block
 */

export function useParagraph(block: Block) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [content, setContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const debouncedContent = useDebounce(newContent, 1250);
  const [isEditing, setIsEditing] = useState(false);

  //* when loads, get the content from the API
  useEffect(() => {
    getParagraphContent(block).then((data) => {
      setContent(data);
    });
  }, []);

  return {
    loading,
    error,
    content,
    setContent,
    newContent,
    setNewContent,
    isEditing,
    setIsEditing,
  };
}

/**
 * Get the content of a paragraph
 * @param Paragraph
 * @returns Promise<{content: string}>
 */

async function getParagraphContent(Paragraph: Block) {
  //fetch the content from the API
  const data = await fetch("/api/block", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blockId: Paragraph.id,
      blockType: Paragraph.blockType,
      comand: "get",
      pageId: Paragraph.pageId,
    }),
  }).then((res) => res.json());

  //validate the response
  if (data.error) {
    throw new Error(data.error);
  }

  if (!data.content) {
    throw new Error("No content");
  }

  return data.content;
}
