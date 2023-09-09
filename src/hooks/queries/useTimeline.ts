//* Libraries imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//* Types imports
import { type Timeline } from "../../schemas/timeline";

type ApiResponse = {
  error: boolean;
  timeline: Timeline;
};

async function getTimeline(pageId: string) {
  const url = `/api/timeline/${pageId}`;
  const response = await axios.get<ApiResponse>(url);
  return response.data;
}

export default function useTimeline(pageId: string) {
  return useQuery(["timeline", pageId], () => getTimeline(pageId), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
}
