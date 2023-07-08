//* Libraries imports
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FileImage, X } from '@phosphor-icons/react';
import toast from 'react-hot-toast';
import z from 'zod';

//* Component imports
import Danger from "../../Toasts/Danger";

import default_world_image from '../../../assets/default_world.jpg';

const fileTypeSchema = z.enum(["image/png", "image/jpeg", "image/jpg", "image/gif"], {
  invalid_type_error: "Invalid file type. Please upload a PNG, JPEG, JPG or GIF file.",
});

type FileType = z.infer<typeof fileTypeSchema>;

type Props = {
  accept: FileType[];
  maxFileSize: number;
}

//return 5MB, if size is 5000000 for example
//or 5KB, if size is 5000 for example
function computeImageSize(size: number): string {
  const sizeInKB = size / 1000;
  if (sizeInKB > 1000) {
    return `${(sizeInKB / 1000).toFixed(2)}MB`;
  } else {
    return `${sizeInKB.toFixed(2)}KB`;
  }
}

export default function ImageUpload(props: Props) {
  const [image, setImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  //validate image
  useEffect(() => {
    if (image) {
      //validate size
      if (image.size > props.maxFileSize) {
        toast.custom((t) => (
          <Danger
            t={t}
            topMsg="Invalid image size"
            bottomMsg={`The image size is ${computeImageSize(image.size)}, but it should be less than ${computeImageSize(props.maxFileSize)}.`}
          />
        ))
        setImage(null);
      }
      //validate type
      if (fileTypeSchema.safeParse(image.type).success === false) {
        toast.custom((t) => (
          <Danger
            t={t}
            topMsg="Invalid image type"
            bottomMsg="The image type is not valid. Please upload a PNG, JPEG, JPG or GIF"
          />
        ))
        setImage(null);
      }
    }
  }, [image]);

  return (
    <div className='w-full h-48 transition-all bg-yellow-800 rounded-lg overflow-hidden relative'>
      <input
        ref={inputRef}
        id="image"
        name="image"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
          }
        }}
      />
      {
        image
          ? <>
            <div className='w-full h-full absolute inset-0'>
              <Image
                src={URL.createObjectURL(image)}
                alt="world image"
                className='w-full h-full object-cover'
                width={400}
                height={200}
              />
            </div>
            <div className='p-4 absolute right-0 top-0'>
              <button
                className="flex flex-row items-center justify-center p-2 rounded-full hover:bg-purple-200"
                onClick={() => {
                  setImage(null);
                  if (inputRef.current) {
                    inputRef.current.value = '';
                  }
                }}
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>
          </>
          : <>
            {/* default */}
            <div className='w-full h-full absolute inset-0 bg-blue-400'>
              <Image
                src={default_world_image}
                alt="default world image"
                className='w-full h-full object-cover'
                width={400}
                height={200}
              />
            </div>
            {/* blur */}
            <div className='w-full h-full bg-black/70 backdrop-blur-2xl absolute inset-0' />
            {/* icon */}
            <label
              htmlFor='image'
              className='w-full h-full flex flex-col justify-center items-center absolute inset-0'
            >
              <FileImage className='w-16 h-16 text-white' />
              <span className='text-white font-bold text-lg'>Adicionar imagem</span>
            </label>
          </>
      }
    </div >
  );
}