//* Libraries imports
import { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Vibrant from 'node-vibrant';
import colors from "tailwindcss/colors";

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";
import useDebounce from "../../../hooks/common/useDebounce";

type Props = {
  color: [number, number, number];
  setColor: (color: [number, number, number]) => void;
}

export default function PageBackgroundImage(props: Props) {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");
  const pageImage = page.data?.image || "/login_screen_image.jpg";
  const debouncedPageImage = useDebounce(pageImage, 200);

  useMemo(() => {
    const v = new Vibrant(pageImage);
    v.getPalette().then((palette) => {
      const color = palette.Vibrant?.hsl;
      // the color on the first position is in 0-1 range (porcent), but hsl
      // works in 0-360 range, so, we need to multiply it by 360
      const color2 = color ? [color[0] * 360, color[1] * 100, color[2] * 100 / 8] : [0, 0, 0];
      props.setColor(color2 as [number, number, number]);
    });
  }, [debouncedPageImage]);

  return (
    <div className='absolute top-20 left-0 w-full h-[420px] flex justify-center items-center overflow-hidden'>
      <Image
        alt='background'
        src={debouncedPageImage}
        className='object-cover object-center w-full h-full transition-all duration-500 ease-in-out antialiased'
        width={1920}
        height={1080}
        blurDataURL={debouncedPageImage}
        priority
      />
      <div
        className='absolute bottom-0 left-0 w-full h-1/2 transition-all duration-500 ease-in-out'
        style={{
          background: props.color ? `linear-gradient(180deg, transparent 0%, hsl(${props.color[0]}, ${props.color[1]}%, ${props.color[2]}%) 100%)` : `linear-gradient(180deg, transparent 0%, ${colors.neutral[800]} 100%)`
        }}
      />
    </div>
  );
}