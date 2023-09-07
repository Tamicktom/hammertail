//* Libraries imports
import { useState, useEffect, useMemo, forwardRef } from "react";
import type { ReactNode, Ref, ElementRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import * as Select from "@radix-ui/react-select";
import { ArrowDown, ArrowUp, Check, Plus } from "@phosphor-icons/react";

//* Components imports
import PageInfoImage from "../../PageInfoImage";
import StartEndDate from "../../../specific/StartEndDate";
import MultiRangeSlider from "../../../common/MultRangeSlider";

//* Utils imports
import { timelineSchema, type TimelineItem } from "../../../../schemas/timeline";

//* Hooks Imports
import usePage from "../../../../hooks/queries/usePage";
import useUpdateTimeline from "../../../../hooks/mutations/useUpdateTimeline";
import useGetPagesByType from "../../../../hooks/common/useGetPagesByType";

//* Type imports
import type { Page } from "@prisma/client";

const characterItems = [
  {
    id: "1",
    name: "Sword",
    image: "/images/sword.png",
    description: "A sword that is used to kill people.",
    start: 0,
    end: 20,
  },
  {
    id: "2",
    name: "Shield",
    image: "/images/shield.png",
    description: "A shield that is used to protect people.",
    start: 0,
    end: 20,
  }
]

export default function CharacterInfo() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");

  return (
    <div className="flex flex-col items-start justify-start w-full gap-4">
      <div className='flex items-center justify-center w-full'>
        <PageInfoImage
          page={page.data}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <StartEndDate />
        <PageItems />
      </div>
    </div>
  );
}



function PageItems() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");
  const updateTimeline = useUpdateTimeline();
  const [selected, setSelected] = useState<string>("");
  const [items, setItems] = useState<TimelineItem[]>([]);
  const availableItems = useGetPagesByType("items", page.data?.world?.id);
  const [filteredAvailableItems, setFilteredAvailableItems] = useState<Page[]>([]);

  useEffect(() => {
    if (availableItems.data) {
      const filteredItems = availableItems.data.data.pages.filter((item) => {
        return !items.find((item2) => item2.id === item.id);
      });

      setFilteredAvailableItems(() => filteredItems);
    }
  }, [availableItems.data, items]);

  useMemo(() => {
    if (page.data?.other) {
      const timeline = timelineSchema.safeParse(page.data.other);
      console.log("timeline", timeline);
      if (timeline.success) {
        setItems(() => timeline.data.items);
      }
    }
  }, [page.data?.other]);

  const handleAddItem = (itemId: string) => {
    setSelected(itemId);
    const newItems: TimelineItem[] = [...items];
    const item = availableItems.data?.data.pages.find((item) => item.id === itemId);

    if (!item) return;
    newItems.push({
      id: item.id,
      name: item.name,
      image: item.image,
      description: "",
      start: 0,
      end: 0,
    });

    setItems(() => newItems);
    setSelected("");
  }

  const handleRemoveItem = (itemId: string) => {
    const newItems: TimelineItem[] = [...items];
    const itemIndex = newItems.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) return;
    newItems.splice(itemIndex, 1);

    setItems(() => newItems);
  }

  useEffect(() => {
    console.log("items", items);
  }, [items]);

  return (
    <div className="flex flex-col w-full">
      <Select.Root
        onValueChange={handleAddItem}
        onOpenChange={(open) => {
          console.log("open", open);
        }}
        value={selected}
      >
        <Select.Trigger className="inline-flex items-center justify-center bg-white">
          <Select.Value placeholder="Select an item to add" />
          <Select.Icon>
            <Plus size={24} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white z-50">
            <Select.ScrollUpButton>
              <ArrowUp size={24} />
            </Select.ScrollUpButton>
            <Select.Viewport>
              {/* <SelectItem value="1" children="Sword" /> */}
              {
                filteredAvailableItems.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={item.id}
                    children={item.name}
                    className="text-neutral-900 bg-white hover:bg-neutral-100 transition-all duration-300"
                  />
                ))
              }
              <Select.Separator />
            </Select.Viewport>
            <Select.ScrollDownButton>
              <ArrowDown size={24} />
            </Select.ScrollDownButton>
            <Select.Arrow />
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <div>
        {
          items.map((item) => (
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
                <button onClick={() => handleRemoveItem(item.id)}>
                  <p className="text-neutral-900">Remove</p>
                </button>
              </div>
              <div className="flex flex-col w-full gap-2">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 bg-neutral-100 rounded-md"
                />
                <div className="flex items-center justify-between w-full">
                  <MultiRangeSlider
                    min={page.data?.world?.start || 0}
                    max={page.data?.world?.end || 0}
                    onChange={(value) => {
                      console.log("value", value);
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

type SelectItemProps = {
  children: ReactNode;
  className?: string;
  value: string;
}

const SelectItem = forwardRef(function SelectItem({ children, className, value, ...props }: SelectItemProps, forwardedRef: Ref<ElementRef<typeof Select.Item>>) {
  return (
    <Select.Item className={className} value={value} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <Check />
      </Select.ItemIndicator>
    </Select.Item>
  );
});