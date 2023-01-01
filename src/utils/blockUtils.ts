//* Type imports
import type { BlockContent } from "../types/block";

export const saveBlock = async (id: string, blockContent: BlockContent) => {
  const block = { id, blockContent };
  const res = await fetch("/api/block", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(block),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
