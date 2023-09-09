//* Libraries imports
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

//* Components imports
import PageInfoImage from "../../PageInfoImage";
import StartEndDate from "../../../specific/StartEndDate";
import PageItems from "./PageItems";

//* Hooks Imports
import usePage from "../../../../hooks/queries/usePage";
import useUpdateTimeline from "../../../../hooks/mutations/useUpdateTimeline";
import { timelineSchema, type Timeline } from "../../../../schemas/timeline";

//* Atoms imports
import { timelineAtom } from "../../../../atoms/timeline";

export default function CharacterInfo() {
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [timelineAtomValue] = useAtom(timelineAtom);
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");
  const updateTimeline = useUpdateTimeline();

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

  useEffect(() => {
    if (timeline && page.data?.id && timelineAtomValue) {
      updateTimeline.mutate({
        pageId: page.data.id,
        timeline: timelineAtomValue,
      });
      page.refetch();
    }
  }, [timelineAtomValue]);

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
