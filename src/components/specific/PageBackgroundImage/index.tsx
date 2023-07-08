//* Libraries imports
import Image from "next/image";
import { useRouter } from "next/router";

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";

export default function PageBackgroundImage() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className='absolute top-20 left-0 w-full h-96 flex justify-center items-center overflow-hidden'>
      <Image
        alt='background'
        src={page.data?.image || "/login_screen_image.jpg"}
        className='object-cover object-center w-full h-full'
        width={1920}
        height={1080}
        priority
      />
    </div>
  );
}