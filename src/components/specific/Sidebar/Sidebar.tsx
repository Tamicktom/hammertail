//* Libraries imports
import Link from "next/link";
import { Root, Item, Header, Content, Trigger } from '@radix-ui/react-accordion';
import { CaretDown } from "@phosphor-icons/react";

//* Hook imports
import useGetPagesByType from "../../../hooks/common/useGetPagesByType";

//* Type imports
import type { Page } from "@prisma/client";

type Props = {
  collapsed: boolean;
  worldId: string;
}

export default function Sidebar(props: Props) {
  const characters = useGetPagesByType("characters", props.worldId);
  const events = useGetPagesByType("events", props.worldId);
  const places = useGetPagesByType("places", props.worldId);
  const items = useGetPagesByType("items", props.worldId);
  const und = useGetPagesByType("undefined", props.worldId);

  return (
    <Root
      type="multiple"
      defaultValue={["Characters"]}
      className='container flex flex-col h-full bg-neutral-700 w-full'
    >
      <AccordionItem title="Characters" content={characters.data?.data.pages || []} />
      <AccordionItem title="Events" content={events.data?.data.pages || []} />
      <AccordionItem title="Places" content={places.data?.data.pages || []} />
      <AccordionItem title="Items" content={items.data?.data.pages || []} />
      <AccordionItem title="Undefined" content={und.data?.data.pages || []} />
    </Root>
  );
}

type AccordionItemProps = {
  title: string;
  content: Page[];
}

const AccordionItem = (props: AccordionItemProps) => {
  return (
    <Item
      value={props.title}
      className='w-full'
    >
      <HeaderTrigger title={props.title} />
      <Content className='w-full overflow-hidden AccordionContent'>
        {
          props.content.map((item, index) => {
            return <Button key={index} text={item.name} link={`page/${item.id}`} />
          })
        }
      </Content>
    </Item>
  );
};

type HeaderTriggerProps = {
  title: string;
}

const HeaderTrigger = (props: HeaderTriggerProps) => {
  return (
    <Header className='w-full border-b hover:bg-black/10 border-tertiary-400/50'>
      <Trigger className='flex flex-row justify-between w-full px-4 py-2 AccordionTrigger'>
        <span className="text-xl font-bold text-neutral-100">{props.title}</span>
        <CaretDown className="text-neutral-200 icon" />
      </Trigger>
    </Header>
  );
}

type ButtonProps = {
  text: string;
  link: string;
}

const Button = (props: ButtonProps) => {
  return (
    <Link
      href={{
        pathname: props.link,
        slashes: true,
      }}
    >
      <button
        className="flex flex-row items-center justify-start w-full px-4 py-1 border-b border-tertiary-400/20 hover:bg-black/20 bg-black/10"
      >
        <span className="text-neutral-200">{props.text}</span>
      </button>
    </Link>
  );
}
