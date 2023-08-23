//* Libraries imports
import { Pen } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod";

//* Components imports
import Sucess from "../../Toasts/Sucess";
import Danger from "../../Toasts/Danger";
import Alert from "../../Toasts/Alert";

//* Hooks Imports
import type { PageWorld } from "../../../hooks/queries/usePage";

type Props = {
  page?: PageWorld;
}

export default function PageInfoImage(props: Props) {
  const editImage = useEditImage();

  /**
   * Opens the file selector.
   * 
   * @returns void
   */

  const handleOpenFileSelector = () => {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("accept", "image/*");
    fileSelector.setAttribute("multiple", "false");
    fileSelector.setAttribute("hidden", "true");
    fileSelector.setAttribute("id", "fileSelector");
    fileSelector.onchange = () => handleFile(fileSelector.files);
    fileSelector.click();
  }

  /**
   * Handles the image upload.
   * 
   * @param files The files to be uploaded. If null, will show an error toast.
   * @returns void
   */

  const handleFile = (files: FileList | null) => {
    if (!files)
      return toast.custom((t) => (
        <Alert
          t={t}
          topMsg="Nenhuma imagem selecionada!"
          bottomMsg="Nenhuma imagem foi selecionada, por favor selecione uma imagem!"
        />
      ));

    const formData = new FormData();
    formData.append("image", files[0]!);

    editImage.mutate({
      data: formData,
      pageId: props.page!.id,
      worldId: props.page!.worldId
    }, {
      onSuccess: () => toast.custom((t) => (
        <Sucess
          t={t}
          topMsg="Imagem alterada com sucesso!"
          bottomMsg="A imagem foi alterada com sucesso!"
        />
      )),
      onError: (error) => toast.custom((t) => (
        <Danger
          t={t}
          topMsg="Erro ao alterar a imagem!"
          bottomMsg="Ocorreu um erro ao alterar a imagem!"
        />
      )),
    });
  }

  if (!props.page)
    return (
      <div></div>
    );

  if (editImage.isLoading) return <div></div>;

  return (
    <div className="w-full relative">
      <button
        className="absolute top-2 right-2 bg-neutral-700 rounded-full p-1"
        onPointerUp={handleOpenFileSelector}
      >
        <Pen className="absolute top-0 right-0 w-7 h-7 text-neutral-300" />
      </button>
      <img
        src="https://th.bing.com/th/id/OIP.t3SF3TpmOxVWm-e-QnojAQHaLH?pid=ImgDet&rs=1"
        alt="Imagem do personagem"
        className="w-full rounded-lg border border-neutral-700"
        placeholder="blur"
      />
    </div>
  );
}

type EditImageProps = {
  data: FormData;
  pageId: string;
  worldId: string;
}

const editImage = async (props: EditImageProps) => {
  if (!z.string().uuid().safeParse(props.pageId).success)
    throw new Error("PageId is not an uuid");

  if (!z.string().uuid().safeParse(props.worldId).success)
    throw new Error("WorldId is not an uuid");

  const image = validateImage(props.data.get("image"), {
    maxSize: 8 * 1024 * 1024, //8MB
    types: ["jpg", "jpeg", "png", "gif"]
  });
};

export function useEditImage() {
  return useMutation(editImage);
}

type Options = {
  maxSize?: number;
  types?: ("jpg" | "jpeg" | "png" | "gif")[];
}

function validateImage(image: File | FormDataEntryValue | null, options: Options): File {
  //validate if is an file
  if (!(image instanceof File)) throw new Error("Image is not a file");

  //validate if is an image
  if (!image.type.startsWith("image")) throw new Error("Image is not an image");

  //validate if is bigger than maxSize
  if (options.maxSize && image.size > options.maxSize) throw new Error("Image is bigger than maxSize");

  //validate if is jpg, jpeg, png or gif
  if (options.types && !options.types.some(type => image.type.includes(type))) throw new Error("Image is not jpg, jpeg, png or gif");

  return image;
}