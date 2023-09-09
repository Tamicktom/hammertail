//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//* Types imports
import type { World } from "@prisma/client";
import type { APIResponse } from "../../types/api";

/**
 * Get the worlds that the user owns
 * @returns The worlds that the user owns
 */

async function getWorldList() {
  const response = await axios.get<APIResponse<World[]>>(
    "/api/world/getWorldList"
  );
  return response.data.data;
}

/**
 * Get the worlds that the user owns
 * @returns The worlds that the user owns
 */

export default function useWorldList() {
  return useQuery(["worldList"], () => getWorldList(), {
    cacheTime: 1000 * 60 * 5, // 5 minutes
  });
}
