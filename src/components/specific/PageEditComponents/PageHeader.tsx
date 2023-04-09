//* Libraries imports

//* Local imports
import type { PageType } from "@prisma/client";

type PageHeaderProps = {
  title: string;
  pageType: PageType;
}

export const PageHeader = ({ title, pageType }: PageHeaderProps) => {
  return (
    <div className='flex flex-col w-full gap-2 mb-8'>
      <span className='text-white'>
        {
          pageType.name.substring(0, 1).toUpperCase() + pageType.name.substring(1)
        }
      </span>
      <h1 className="text-5xl font-bold text-white">{title}</h1>
    </div>
  );
};
