//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//* Types imports
import type { World } from "@prisma/client";
import type { APIResponse } from "../../types/api";

/**
 * Get the worlds that the user owns
 * @param userId The user id
 * @returns The worlds that the user owns
 */

async function getWorldList(userId: string) {
  const body = JSON.stringify({ userId });
  const response = await axios.post<APIResponse<World[]>>(
    "/api/world/getWorldList",
    body
  );
  return response.data.data;
}

/**
 * Get the worlds that the user owns
 * @param userId The user id
 * @returns The worlds that the user owns
 */

export default function useWorldList(userId: string) {
  return useQuery(["worldList", userId], () => getWorldList(userId), {
    enabled: !!userId,
    cacheTime: 1000 * 60 * 5, // 5 minutes
  });
}
