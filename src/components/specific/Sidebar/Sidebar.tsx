//* Libraries imports
import Link from "next/link";
import {
  Root,
  Item,
  Header,
  Content,
  Trigger,
} from "@radix-ui/react-accordion";
import {
  CaretDown,
  Person,
  Sword,
  Globe,
  Calendar,
} from "@phosphor-icons/react";
import { useAtom } from "jotai";

//* Hook imports
import useGetPagesByType from "../../../hooks/common/useGetPagesByType";
import usePage from "../../../hooks/queries/usePage";
import { useRef, useState, useLayoutEffect, ReactNode } from "react";

//* Type imports
import type { Page } from "@prisma/client";
import { useRouter } from "next/router";

//* Atoms imports
import { sidebarCollapseAtom } from "../../../atoms/sidebar";

export default function Sidebar() {
  const router = useRouter();
  const page = usePage(typeof router.query.index === "string" ? router.query.index : "");
  const characters = useGetPagesByType("characters", page.data?.worldId);
  const events = useGetPagesByType("events", page.data?.worldId);
  const places = useGetPagesByType("places", page.data?.worldId);
  const items = useGetPagesByType("items", page.data?.worldId);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const [sidebarCollapse] = useAtom(sidebarCollapseAtom);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (
        sidebarRef.current?.clientWidth &&
        sidebarRef.current.clientWidth <= 148
      ) {
        setShowIcons(true);
      } else {
        setShowIcons(false);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (sidebarRef.current) {
      resizeObserver.observe(sidebarRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="container flex h-full flex-col bg-neutral-700 transition-all ease-in-out duration-300"
      style={{
        width: sidebarCollapse ? "80px" : "320px",
      }}
    >
      <Root type="multiple" defaultValue={["Characters"]} className="w-full">
        <AccordionItem
          value="Characters"
          title={
            showIcons ? (
              <Person size={28} className="icon text-neutral-100" />
            ) : (
              "Characters"
            )
          }
          content={characters.data?.data.pages || []}
        />
        <AccordionItem
          value="Events"
          title={
            showIcons ? (
              <Calendar size={28} className="icon text-neutral-100" />
            ) : (
              "Events"
            )
          }
          content={events.data?.data.pages || []}
        />
        <AccordionItem
          value="Places"
          title={
            showIcons ? <Globe size={28} className="icon text-neutral-100" /> : "Places"
          }
          content={places.data?.data.pages || []}
        />
        <AccordionItem
          value="Items"
          title={
            showIcons ? <Sword size={28} className="icon text-neutral-100" /> : "Items"
          }
          content={items.data?.data.pages || []}
        />
      </Root>
    </div>
  );
}

type AccordionItemProps = {
  title: ReactNode;
  value: string;
  content: Page[];
};

const AccordionItem = (props: AccordionItemProps) => {
  return (
    <Item value={props.value} className="w-full">
      <HeaderTrigger title={props.title} />
      <Content className="AccordionContent w-full overflow-hidden">
        {props.content.map((item, index) => {
          return <Button key={index} text={item.name} link={item.id} />;
        })}
      </Content>
    </Item>
  );
};

type HeaderTriggerProps = {
  title: ReactNode;
};

const HeaderTrigger = (props: HeaderTriggerProps) => {
  return (
    <Header className="border-tertiary-400/50 w-full border-b hover:bg-black/10">
      <Trigger className="AccordionTrigger flex w-full flex-row justify-between px-4 py-2">
        <span className="text-lg font-bold text-neutral-100">
          {props.title}
        </span>
        <CaretDown className="icon w-6 h-6 text-neutral-200" />
      </Trigger>
    </Header>
  );
};

type ButtonProps = {
  text: string;
  link: string;
};

const Button = (props: ButtonProps) => {
  return (
    <Link href={props.link}>
      <button className="border-tertiary-400/20 flex w-full flex-row items-center justify-start border-b bg-black/10 px-4 py-1 hover:bg-black/20">
        <span className="text-neutral-200">{props.text}</span>
      </button>
    </Link>
  );
};
