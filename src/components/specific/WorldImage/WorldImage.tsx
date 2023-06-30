//* Libraries imports
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FileImage, X } from '@phosphor-icons/react';

import default_world_image from '../../../assets/default_world.jpg';

export default function WorldImage() {
  const [image, setImage] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  //validate image
  useEffect(() => {
    if (image) {
      //validate size
      if (image.size > 5000000) {
        alert('A imagem deve ter no máximo 5MB');
        setImage(undefined);
      }
      //validate type
      if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
        alert('A imagem deve ser do tipo PNG ou JPEG');
        setImage(undefined);
      }
    }
  }, [image]);

  return (
    <div className='w-full h-48 transition-all bg-yellow-800 rounded-lg overflow-hidden relative'>
      <input
        ref={inputRef}
        id="worldImage"
        name="worldImage"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
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
                  setImage(undefined);
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
              htmlFor='worldImage'
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