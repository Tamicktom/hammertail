//* Libraries imports
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

//* Components imports
import Alert from "../../components/Toasts/Alert";

type PageDate = {
  pageId: string;
  start: number;
  end: number;
};

async function updatePageDate(date: PageDate) {
  const { pageId, start, end } = date;
  const { data } = await axios.put(`/api/pages/updatePageDate`, {
    pageId,
    start,
    end,
  });
  return data;
}

export default function useUpdatePageDate() {
  const queryClient = useQueryClient();
  return useMutation(updatePageDate, {
    onSuccess: () => {
      queryClient.invalidateQueries(["page"]);
    },
    onError: () => {
      toast.custom((t) => (
        <Alert
          t={t}
          topMsg="Error updating page date"
          bottomMsg="Please, try again"
        />
      ));
    }
  });
}
