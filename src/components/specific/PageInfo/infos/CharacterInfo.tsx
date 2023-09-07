//* Libraries imports
import { useRouter } from "next/router";

//* Components imports
import PageInfoImage from "../../PageInfoImage";
import StartEndDate from "../../../specific/StartEndDate";
import PageItems from "./PageItems";

//* Hooks Imports
import usePage from "../../../../hooks/queries/usePage";

export default function CharacterInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <div className='flex items-center justify-center w-full'>
        <PageInfoImage
          page={page.data}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <StartEndDate />
        <PageItems />
      </div>
    </div>
  );
}
