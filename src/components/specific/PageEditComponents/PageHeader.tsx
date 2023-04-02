

type PageHeaderProps = {
  title: string;
  pageType: string;
}

export const PageHeader = ({ title, pageType }: PageHeaderProps) => {
  return (
    <div className='flex flex-col w-full gap-2'>
      <span className='font-bold text-white'>{pageType}</span>
      <h1 className="text-5xl font-bold text-white">{title}</h1>
    </div>
  );
};
