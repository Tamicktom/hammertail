//* Libraries imports
import { useState, useEffect } from "react";

//* Type imports
import type { Block } from "@prisma/client";

//* Custom hooks
import useDebounce from "./useDebounce";

export function useParagraph(block: Block) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [content, setContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const debouncedContent = useDebounce(newContent, 1250);

  //* when loads, get the content from the API
  useEffect(() => {
    getParagraphContent(block).then((data) => {
      console.log(data);
    });
  }, []);

  return { loading, error, content, newContent, setNewContent };
}

/**
 * Get the content of a paragraph
 * @param Paragraph
 * @returns Promise<{content: string}>
 */

async function getParagraphContent(Paragraph: Block) {
  //fetch the content from the API
  let data = await fetch("/api/block", {
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
