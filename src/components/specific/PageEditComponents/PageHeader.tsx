//* Libraries imports
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import z from "zod";
import { useRouter } from "next/router";

//* Local imports
import usePage from "../../../hooks/queries/usePage";
import useDebounce from "../../../hooks/common/useDebounce";
import useGetPagesByType, { type PageTypes } from "../../../hooks/common/useGetPagesByType";

const pageNameSchema = z.object({
  name: z.string().min(1, {
    message: "Page name must be at least 1 character long",
  }).max(80, {
    message: "Page name must be at most 80 characters long",
  }),
  pageId: z.string().uuid(),
});

export default function PageHeader() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");
  const [pageName, setPageName] = useState<string>(page.data?.name || "NO NAME");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pages = useGetPagesByType(page.data?.PageType?.name as PageTypes || "undefined", page.data?.worldId);

  const debouncedPageName = useDebounce(pageName, 1200);

  const handlePageNameUpdate = async () => {
    const body = pageNameSchema.safeParse({
      name: debouncedPageName,
      pageId: page.data?.id,
    });

    if (!body.success) {
      return;
    }

    await axios.post("/api/pages/updatePageName", body.data);
    page.refetch();
    pages.refetch();
  }

  useEffect(() => {
    if (debouncedPageName !== page.data?.name) {
      handlePageNameUpdate();
    }
  }, [debouncedPageName]);

  useEffect(() => {
    setPageName(page.data?.name || "NO NAME");
  }, [page.data?.name]);

  return (
    <div className='flex flex-col w-full gap-2 mb-8'>
      <span className='text-white'>
        {
          page.data?.PageType &&
          page.data.PageType.name.substring(0, 1).toUpperCase() + page.data.PageType.name.substring(1)
        }
      </span>
      <div
        className='flex items-center gap-2'
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => {
            if (inputRef.current)
              inputRef.current.focus();
          }, 50);
        }}
        onBlur={() => setIsEditing(false)}
      >
        {
          isEditing
            ? <input
              ref={inputRef}
              className='w-full text-5xl font-bold text-white bg-transparent outline-none'
              style={{
                display: isEditing ? "block" : "none",
              }}
              type="text"
              value={pageName}
              onChange={(e) => {
                setPageName(e.target.value)
              }}
              onBlur={() => setIsEditing(false)}
            />
            : <h1
              className="text-5xl font-bold text-white py-2"
              style={{
                display: isEditing ? "none" : "block",
              }}
            >{pageName}
            </h1>
        }
      </div>
    </div>
  );
};
