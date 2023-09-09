//* Libraries imports
import { useEffect } from "react";
import { useAtom } from "jotai";

//* Components imports
import PageInfoImage from "../../PageInfoImage";
import StartEndDate from "../../../specific/StartEndDate";
import PageItems from "./PageItems";

//* Hooks Imports
import { type PageWorld } from "../../../../hooks/queries/usePage";
import useUpdateTimeline from "../../../../hooks/mutations/useUpdateTimeline";
import useTimeline from "../../../../hooks/queries/useTimeline";

//* Atoms imports
import { timelineAtom } from "../../../../atoms/timeline";

type Props = {
  page: PageWorld
}

export default function EventInfo(props: Props) {
  const timeline = useTimeline(props.page.id);
  const [timelineAtomValue] = useAtom(timelineAtom);
  const updateTimeline = useUpdateTimeline();

  useEffect(() => {
    timeline.remove();
    timeline.refetch();
  }, [props.page.id]);

  useEffect(() => {
    if (timeline && props.page.id && timelineAtomValue) {
      updateTimeline.mutate({
        pageId: props.page.id,
        timeline: timelineAtomValue,
      });
    }
  }, [timelineAtomValue]);

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <div className='flex items-center justify-center w-full'>
        <PageInfoImage
          page={props.page}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        {
          // props.page && props.page.other?.timeline && timeline &&
          timeline.data && !timeline.isLoading &&
          <>
            <StartEndDate page={props.page} />
            <PageItems items={timeline.data.timeline.characters} type="characters" />
            <PageItems items={timeline.data.timeline.items} type="items" />
            <PageItems items={timeline.data.timeline.places} type="places" />
          </>
        }
      </div>
    </div>
  );
}