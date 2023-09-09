//* Libraries imports
import Image from "next/image";
//* Components imports
import MultiRangeSlider from "../../../common/MultRangeSlider";

//* Utils imports
import type { GenericTimelineObject } from "../../../../schemas/timeline";

type CardsProps = {
  items: GenericTimelineObject[];
  removeItem: (itemId: string) => void;
  min: number;
  max: number;
  setItems: (items: GenericTimelineObject[]) => void;
}

export default function Cards(props: CardsProps) {
  return (
    <div>
      {
        props.items.map((item) => (
          <div key={item.id} className="flex flex-col w-full gap-2 bg-white">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start gap-2">
                {
                  item.image &&
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={32}
                    height={32}
                  />
                }
                <p className="text-neutral-900">{item.name}</p>
              </div>
              <button onClick={() => props.removeItem(item.id)}>
                <p className="text-neutral-900">Remove</p>
              </button>
            </div>
            <div className="flex flex-col w-full gap-2">
              <input
                type="text"
                placeholder="Description"
                className="w-full p-2 bg-neutral-100 rounded-md"
                onChange={(e) => {
                  const newItems = [...props.items];
                  const itemIndex = newItems.findIndex((item2) => item2.id === item.id);

                  if (itemIndex < 0 || !newItems[itemIndex]) return;
                  if (newItems && newItems[itemIndex]) {
                    (newItems[itemIndex] as GenericTimelineObject).description = e.target.value;
                  }

                  props.setItems(newItems);
                }}
              />
              <div className="flex items-center justify-between w-full">
                <MultiRangeSlider
                  defaultMin={item.start}
                  defaultMax={item.end}
                  min={props.min}
                  max={props.max}
                  onChange={(value) => {
                    const newItems = [...props.items];
                    const itemIndex = newItems.findIndex((item2) => item2.id === item.id);

                    if (itemIndex < 0 || !newItems[itemIndex]) return;
                    if (newItems && newItems[itemIndex]) {
                      (newItems[itemIndex] as GenericTimelineObject).start = value.min;
                      (newItems[itemIndex] as GenericTimelineObject).end = value.max;
                    }

                    props.setItems(newItems);
                  }}
                />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}