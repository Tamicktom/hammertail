//* Component imports
import { CharacterInfo, EventInfo } from "./infos";

//* Hooks imports
import type { PageWorld } from "../../../hooks/queries/usePage";

type Props = {
  page: PageWorld
}

export default function PageInfo(props: Props) {

  return (
    <div className="flex items-center justify-center w-full p-2">
      {
        props.page
          ? renderRightInfo(props.page)
          : <></>
      }
    </div>
  );
}

function renderRightInfo(page: PageWorld) {
  if (!page) return <NoPageType />
  if (page.PageType.name === "characters") return <CharacterInfo page={page} />
  if (page.PageType.name === "places") return <PlaceInfo />
  if (page.PageType.name === "items") return <ItemInfo />
  if (page.PageType.name === "events") return <EventInfo />
}

function ItemInfo() {
  return (
    <>
      <h2 className="text-white">Item</h2>
    </>
  );
}
function PlaceInfo() {
  return (
    <>
      <h2 className="text-white">Location</h2>
    </>
  );
}

function NoPageType() {
  return (
    <>
      <h2 className="text-white">No page type</h2>
    </>
  );
}