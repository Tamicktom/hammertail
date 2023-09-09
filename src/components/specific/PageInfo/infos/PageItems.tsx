//* Libraries imports
import { useState, useEffect, useMemo, forwardRef } from "react";
import type { ReactNode, Ref, ElementRef } from "react";
import { useRouter } from "next/router";
import * as Select from "@radix-ui/react-select";
import { ArrowDown, ArrowUp, Check, Plus } from "@phosphor-icons/react";
import { useAtom } from "jotai";

//* Components imports
import Cards from "./Cards";

//* Utils imports
import { timelineSchema, type Timeline, type GenericTimelineObject } from "../../../../schemas/timeline";

//* Hooks Imports
import usePage from "../../../../hooks/queries/usePage";
import useGetPagesByType from "../../../../hooks/common/useGetPagesByType";
import useDebounce from "../../../../hooks/common/useDebounce";

//* Type imports
import type { Page } from "@prisma/client";
import type { PageTypes } from "../../../../hooks/common/useGetPagesByType";

//* Atoms imports
import { timelineAtom } from "../../../../atoms/timeline";

type Props = {
  items: GenericTimelineObject[];
  type: PageTypes;
}

export default function PageItems(props: Props) {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");
  const availableItems = useGetPagesByType(props.type, page.data?.world?.id);
  const [, setTimeline] = useAtom(timelineAtom);
  const [selected, setSelected] = useState<string>("");
  const [items, setItems] = useState<GenericTimelineObject[]>(props.items);
  const [filteredAvailableItems, setFilteredAvailableItems] = useState<Page[]>([]);
  const debouncedItems = useDebounce(items, 750);

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
      if (timeline.success) {
        setItems(() => timeline.data.items);
      }
    }
  }, [page.data?.other]);

  const handleAddItem = (itemId: string) => {
    setSelected(itemId);
    const newItems: GenericTimelineObject[] = [...items];
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
    const newItems: GenericTimelineObject[] = [...items];
    const itemIndex = newItems.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) return;
    newItems.splice(itemIndex, 1);

    setItems(() => newItems);
  }

  useEffect(() => {
    if (page.data?.id) {
      setTimeline((prev) => {
        return {
          ...prev,
          [props.type]: debouncedItems,
        }
      });
    }
  }, [debouncedItems]);

  return (
    <div className="flex flex-col w-full">
      <Select.Root
        onValueChange={handleAddItem}
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
                    className="text-neutral-900 bg-white hover:bg-neutral-100 transition-all duration-300"
                  >
                    {item.name}
                  </SelectItem>
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

      <Cards
        items={items}
        removeItem={handleRemoveItem}
        min={page.data?.start || page.data?.world?.start || 0}
        max={page.data?.end || page.data?.world?.end || 0}
        setItems={setItems}
      />
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