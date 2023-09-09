//* Libraries imports
import Image from "next/image";
import { useRouter } from "next/router";

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";

export default function PageBackgroundImage() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className='absolute left-0 flex items-center justify-center w-full overflow-hidden transition-all ease-in top-24 xl:top-20 h-96'>
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