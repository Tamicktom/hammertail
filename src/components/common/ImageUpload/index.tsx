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
  const [imageProportions, setImageProportions] = useState<[number, number]>([400, 300]); //[width, height]
  const [imageLoading, setImageLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const computeProportions = (width: number, height: number) => {
    if (imageLoading) {
      // we need to reduce the image size to fit the container of 400px
      //first, we need to get the proportions of the image
      console.log("tamanhos:", width, height);
      if (width === height) {
        setImageProportions([400, 400]);
        console.log([400, 400])
      } else if (width > height) {
        //now we need to get the proportion of the image
        const proportion = width / height;
        setImageProportions([400, 400 / proportion]);
        console.log([400, 400 / proportion])
      } else {
        //now we need to get the proportion of the image
        const proportion = height / width;
        setImageProportions([400 / proportion, 400]);
        console.log([400 / proportion, 400])
      }
      setImageLoading(false);
    }
  }

  useEffect(() => {
    if (!imageLoading) return;
    if (imageRef.current && imageRef.current instanceof HTMLImageElement && imageRef.current.complete) {
      computeProportions(imageRef.current.width, imageRef.current.height);
    }
  }, [imageLoading]);

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
    <div
      className='w-full flex justify-center items-center transition-all bg-neutral-950 rounded-lg overflow-hidden relative'
      style={{
        height: imageProportions[1],
      }}
    >
      <input
        ref={inputRef}
        id="image"
        name="image"
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setImageLoading(true);
          }
        }}
      />
      <div
        className='w-full absolute inset-0 flex justify-center items-center transition-all'
        style={{
          height: imageProportions[1],
        }}
      >
        <Image
          ref={imageRef}
          src={image ? URL.createObjectURL(image) : default_world_image}
          alt="world image"
          className='w-auto h-auto object-cover transition-all'
          style={{
            filter: image ? 'none' : 'blur(10px)',
            height: imageProportions[1],
          }}
          width={imageProportions[0]}
          height={imageProportions[1]}
        />
      </div>
      <div className='p-4 absolute right-0 top-0'>
        <button
          className="flex flex-row items-center justify-center p-2 rounded-full hover:bg-neutral-600/80 bg-neutral-800/80"
          onClick={(e) => {
            e.preventDefault();
            setImage(null);
            if (inputRef.current) {
              inputRef.current.value = '';
            }
          }}
        >
          <X className="w-5 h-5 text-neutral-100" />
        </button>
      </div>
      {/* icon */}
      {
        !image
          ? <label
            htmlFor='image'
            className='w-full h-full flex flex-col justify-center items-center absolute inset-0'
          >
            <FileImage className='w-16 h-16 text-white' />
            <span className='text-white font-bold text-lg'>Adicionar imagem</span>
          </label>
          : null
      }
    </div >
  );
}