//* Libraries imports
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

//* Utils imports
import {
  updateTimelineSchema,
  type UpdateTimeline,
} from "../../schemas/timeline";
import { queryClient } from "../../utils/queryClient";

async function updateTimeline(timeline: UpdateTimeline) {
  const data = updateTimelineSchema.parse(timeline);
  const response = await axios.post(`/api/pages/updateTimeline`, data);
  return response.data;
}

/**
 * Hook to update a page's timeline.
 */

export default function useUpdateTimeline() {
  return useMutation(["updateTimeline"], updateTimeline, {
    onSuccess: () => {
      queryClient.invalidateQueries(["page", "pages"]);
      queryClient.refetchQueries(["page", "pages"]);
    },
  });
}
