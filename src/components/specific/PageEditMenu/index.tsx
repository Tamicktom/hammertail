//* Libraries imports
import { useState } from "react";
import { Pen } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";

//* Component imports
import ImageUpload from "../../common/ImageUpload";

export default function PageEditMenu() {
  return (
    <div className='absolute group -top-12 h-12 w-full left-0 px-4 flex flex-row items-center'>
      <EditBackgroundModal />
    </div>
  );
}

function EditBackgroundModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root modal>
      <Dialog.Trigger>
        <button
          className='flex flex-row gap-2 justify-center items-center bg-neutral-700/20 px-2 py-2 rounded-lg h-fit group-hover:bg-neutral-900/80 transition-all hover:neutral-900'
        >
          <Pen className="text-neutral-100/20 group-hover:text-neutral-100/80 hover:text-neutral-50 transition-all" />
          <span className="text-neutral-100/20 group-hover:text-neutral-100/80 hover:text-neutral-50 transition-all">Change background</span>
        </button>
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
              <ImageUpload />
            </Dialog.DialogContent>
            <Dialog.Close
              className="text-neutral-100"
            >
              Close
            </Dialog.Close>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root >
  );
}