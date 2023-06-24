//* Libraries imports

//* Local imports
import type { PageType } from "@prisma/client";
import usePage from "../../../hooks/queries/usePage";


export const PageHeader = () => {
  const page = usePage();

  return (
    <div className='flex flex-col w-full gap-2 mb-8'>
      <span className='text-white'>
        {
          page.data?.PageType &&
          page.data.PageType.name.substring(0, 1).toUpperCase() + page.data.PageType.name.substring(1)
        }
      </span>
      <h1 className="text-5xl font-bold text-white">{page.data?.name || "NO NAME"}</h1>
    </div>
  );
};
