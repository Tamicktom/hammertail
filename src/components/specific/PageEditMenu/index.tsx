//* Libraries imports
import type { FormEvent } from "react";
import { Pen } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/router";
import axios from "axios";
import z from "zod";
import toast from 'react-hot-toast';

//* Component imports
import ImageUpload from "../../common/ImageUpload";
import Alert from "../../Toasts/Alert";
import Sucess from "../../Toasts/Sucess";
import Danger from "../../Toasts/Danger";

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";

const pageImageUploadSchema = z.object({
  worldId: z.string().uuid(),
  pageId: z.string().uuid(),
  image: z.enum(["image/png", "image/jpeg", "image/jpg", "image/gif"]),
});

type APIResponse = {
  uploadLink: {
    data: {
      signedUrl: string;
      path: string;
      token: string;
    };
    error: null;
  };
  error: boolean;
  message: string;
};

export default function PageEditMenu() {
  return (
    <div className='absolute group -top-12 h-12 w-full left-0 px-4 flex flex-row items-center'>
      <EditBackgroundModal />
    </div>
  );
}

function EditBackgroundModal() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  const handleUpload = (e: FormEvent) => {
    e.preventDefault();
    if (!e.target || !(e.target instanceof HTMLFormElement)) {
      toast.custom((t) => (
        <Danger
          t={t}
          topMsg="Invalid form"
          bottomMsg="Something went wrong. Please try again."
        />
      ))
      return;
    }

    const formData = new FormData(e.target);

    // verify if the image is valid
    if (formData.get('image') instanceof File) {
      const image = formData.get('image') as File;

      if (!page.data?.id || !page.data?.worldId) {
        toast.custom((t) => (
          <Danger
            t={t}
            topMsg="Invalid page"
            bottomMsg="Something went wrong. Please try again."
          />
        ))
        return;
      }

      const body = pageImageUploadSchema.safeParse({
        worldId: page.data.worldId,
        pageId: page.data.id,
        image: image.type,
      });

      if (!body.success) {
        toast.custom((t) => (
          <Danger
            t={t}
            topMsg="Invalid form"
            bottomMsg="Something went wrong. Please try again."
          />
        ))
        return;
      }

      axios.post<APIResponse>('/api/pages/updatePageImage', body.data)
        .then((data) => {
          if (data.data.error) {
            throw new Error(data.data.message);
          }
          axios.put(data.data.uploadLink.data.signedUrl, image, {
            headers: {
              'Content-Type': image.type,
              Authorization: `Bearer ${data.data.uploadLink.data.token}`,
            },
          })
            .then((res) => {
              if (res.status === 200) {
                axios.post<APIResponse>('/api/pages/confirmPageImageUpdate', body.data)
                  .then((confirm) => {
                    if (confirm.data.error) {
                      alert(confirm.data.message);
                      return;
                    }
                    toast.custom((t) => (
                      <Sucess
                        t={t}
                        topMsg="Background updated!"
                        bottomMsg="The background was successfully updated."
                      />
                    ))
                    page.refetch();
                  })
                  .catch((err) => {
                    toast.custom((t) => (
                      <Danger
                        t={t}
                        topMsg="Invalid form"
                        bottomMsg={err.message}
                      />
                    ))
                  });
              }
            })
            .catch((err) => {
              toast.custom((t) => (
                <Danger
                  t={t}
                  topMsg="Invalid form"
                  bottomMsg={err.message}
                />
              ))
            })
        })
        .catch((err) => {
          toast.custom((t) => (
            <Danger
              t={t}
              topMsg="Invalid form"
              bottomMsg={err.message}
            />
          ))
        });
    }
  }

  return (
    <Dialog.Root modal>
      <Dialog.Trigger className='flex flex-row gap-2 justify-center items-center bg-neutral-700/20 px-2 py-2 rounded-lg h-fit group-hover:bg-neutral-900/80 transition-all hover:neutral-900'>
        <Pen className="text-neutral-100/20 group-hover:text-neutral-100/80 hover:text-neutral-50 transition-all" />
        <span className="text-neutral-100/20 group-hover:text-neutral-100/80 hover:text-neutral-50 transition-all">Change background</span>
      </Dialog.Trigger>
      <Dialog.Overlay />
      <Dialog.Portal>
        <div
          className="w-screen flex justify-center items-center h-screen bg-neutral-900/80 backdrop-blur-md absolute z-50 left-0 top-0"
        >
          <div className="w-full max-w-2xl bg-neutral-950 rounded-lg p-4">
            <Dialog.Title className="text-neutral-100">
              Edit background image
            </Dialog.Title>
            <Dialog.Description className="text-neutral-100">
              Select a new background image for this page from your computer.
            </Dialog.Description>
            <Dialog.DialogContent>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleUpload}
              >
                <ImageUpload
                  accept={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
                  maxFileSize={8000000}
                />
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-neutral-50 px-4 py-2 rounded-lg mt-4"
                  type="submit"
                >
                  Upload
                </button>
              </form>
            </Dialog.DialogContent>
            {/* <Dialog.Close
              className="text-neutral-100"
            >
              Close
            </Dialog.Close> */}
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root >
  );
}