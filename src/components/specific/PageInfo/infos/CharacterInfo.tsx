//* Libraries imports
import Image from "next/image";
import { useRouter } from "next/router";

//* Components imports
import PageInfoImage from "../../PageInfoImage";
import StartEndDate from "../../../specific/StartEndDate";

//* Hooks Imports
import usePage from "../../../../hooks/queries/usePage";

export default function CharacterInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className='flex items-center justify-center w-full'>
        <PageInfoImage
          page={page.data}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <StartEndDate
          loading={page.isLoading || page.isFetching}
          pageId={page.data?.id || ""}
          startDate={page.data?.start || 0}
          endDate={page.data?.end || 0}
          page={page.data}
        />
      </div>
    </div>
  );
}
