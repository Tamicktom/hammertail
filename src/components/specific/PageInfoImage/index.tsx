//* Libraries imports
import Image from "next/image";

//* Components imports


//* Hooks Imports
import type { PageWorld } from "../../../hooks/queries/usePage";

type Props = {
  page?: PageWorld;
}

export default function PageInfoImage(props: Props) {
  return (
    <Image
      src="https://th.bing.com/th/id/OIP.t3SF3TpmOxVWm-e-QnojAQHaLH?pid=ImgDet&rs=1"
      alt="Imagem do personagem"
      className="w-80 rounded-lg border border-neutral-700"
      width={320}
      height={320}
      priority
      placeholder="blur"
      blurDataURL="https://i.pinimg.com/564x/bb/14/18/bb1418129cfc0b35f874d249bb5ff9e6.jpg"
    />
  );
}