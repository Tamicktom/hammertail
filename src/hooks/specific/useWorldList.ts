//* Libraries imports
import { useState, useEffect } from "react";

//* Types imports
import type { World } from "@prisma/client";
import type { APIResponse } from "../../types/api";

//* Import store
import worldStore from "../../store/common/world";

/**
 * Get the worlds that the user owns
 * @param userId The user id
 * @returns The worlds that the user owns
 */

export const useWorldList = (userId: string) => {
  const worldList = worldStore((state) => state.worlds);
  const updateWorlds = worldStore((state) => state.updateWorlds);

  const [loading, setLoading] = useState(false);
  const [worlds, setWorlds] = useState<World[]>(worldList);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getWorldList(userId)
      .then((response) => {
        if (response && response.status === "success" && response.data) {
          setWorlds(response.data);
          updateWorlds(response.data);
        } else setError("An error occurred while getting the worlds.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log("Worlds: ", worlds);
  }, [worlds]);

  return { loading, worlds, error };
};

/**
 * Get the worlds that the user owns
 * @param userId The user id
 * @returns The worlds that the user owns
 */

async function getWorldList(userId: string) {
  const body = JSON.stringify({ userId });
  const response = await fetch("/api/world/getWorldList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).then((res) => res.json() as Promise<APIResponse<World[]>>);

  if (response.status === "success" && response.data) return response;
  console.error(response.errors);
  return false;
}
