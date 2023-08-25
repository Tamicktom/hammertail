//* Libraries imports
import { useRouter } from "next/router";

//* Types imports
import type { PageType } from "@prisma/client";

//* Component imports
import LocalLoading from "../../common/LocalLoading/LocalLoading";
import { CharacterInfo, EventInfo } from "./infos";

//* Hooks imports
import usePage from "../../../hooks/queries/usePage";

export default function PageInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  if (page.isLoading) return <LocalLoading />

  return (
    <div className="flex items-center justify-center w-full p-2">
      {renderRightInfo(page.data?.PageType)}
    </div>
  );
}

function renderRightInfo(type: PageType | null | undefined) {
  if (!type) return <NoPageType />
  if (type.name === "characters") return <CharacterInfo />
  if (type.name === "places") return <PlaceInfo />
  if (type.name === "items") return <ItemInfo />
  if (type.name === "events") return <EventInfo />
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