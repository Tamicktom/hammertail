//* Libraries imports
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

//* Components imports
import Alert from "../../components/Toasts/Alert";

type PageDate = {
  start: number;
  end: number;
};

async function updatePageDate(date: PageDate) {
  console.log(date);
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
