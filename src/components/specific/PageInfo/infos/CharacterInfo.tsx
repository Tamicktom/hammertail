//* Libraries imports
import { useState, useMemo } from "react";
import { useRouter } from "next/router";

//* Components imports
import PageInfoImage from "../../PageInfoImage";
import StartEndDate from "../../../specific/StartEndDate";
import PageItems from "./PageItems";

//* Hooks Imports
import usePage from "../../../../hooks/queries/usePage";
import { timelineSchema, type Timeline } from "../../../../schemas/timeline";

export default function CharacterInfo() {
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  useMemo(() => {
    if (page.data?.other?.timeline) {
      const timeline = timelineSchema.safeParse(page.data.other?.timeline);
      if (timeline.success) {
        setTimeline(() => timeline.data);
      } else {
        setTimeline(() => {
          return {
            characters: [],
            items: [],
            places: [],
            events: [],
          }
        });
      }
    }
  }, [page.data]);

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <div className='flex items-center justify-center w-full'>
        <PageInfoImage
          page={page.data}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <StartEndDate />
        {
          timeline &&
          <PageItems
            timeline={timeline}
          />
        }
      </div>
    </div>
  );
}
