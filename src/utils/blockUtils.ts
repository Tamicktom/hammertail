//* Type imports
import type { Block } from "@prisma/client";

export const saveBlock = async (id: string, blockContent: Block) => {
  const block = { id, blockContent };
  await fetch("/api/block", {
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
