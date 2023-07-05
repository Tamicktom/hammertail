//* Libraries imports
import Image from "next/image";

export default function PageBackgroundImage() {
  return (
    <div className='absolute top-20 left-0 w-full h-96 flex justify-center items-center overflow-hidden'>
      <Image
        alt='background'
        src='/login_screen_image.jpg'
        className='object-cover object-center w-full h-full'
        width={1920}
        height={1080}
      />
    </div>
  );
}