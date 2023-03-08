//* Libraries imports
import Link from "next/link";
import { Root, Item, Header, Content, Trigger } from '@radix-ui/react-accordion';
import { CaretDown } from 'phosphor-react';

const content1 = [
  {
    text: "Personagem 1",
    link: "/"
  },
  {
    text: "Personagem 2",
    link: "/"
  },
  {
    text: "Personagem 3",
    link: "/"
  },
  {
    text: "Personagem 4",
    link: "/"
  },
  {
    text: "Personagem 5",
    link: "/"
  }
]

const content2 = [
  {
    text: "Item 1",
    link: "/"
  },
  {
    text: "Item 2",
    link: "/"
  },
  {
    text: "Item 3",
    link: "/"
  },
  {
    text: "Item 4",
    link: "/"
  }
]

const content3 = [
  {
    text: "Evento 1",
    link: "/"
  },
  {
    text: "Evento 2",
    link: "/"
  },
  {
    text: "Evento 3",
    link: "/"
  },
  {
    text: "Evento 4",
    link: "/"
  }
]

const content4 = [
  {
    text: "Lugar 1",
    link: "/"
  },
  {
    text: "Lugar 2",
    link: "/"
  },
  {
    text: "Lugar 3",
    link: "/"
  }
]

export const Sidebar = () => {
  return (
    <Root
      type="multiple"
      defaultValue={["Personagens"]}
      className='container flex flex-col w-full h-full bg-tertiary-700'
    >

      <AccordionItem title="Personagens" content={content1} />
      <AccordionItem title="Itens" content={content2} />
      <AccordionItem title="Eventos" content={content3} />
      <AccordionItem title="Lugares" content={content4} />

    </Root>
  );
};

type AccordionItemProps = {
  title: string;
  content: {
    text: string;
    link: string;
  }[];
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
            return <Button key={index} text={item.text} link={item.link} />
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
        <span className="text-xl font-bold text-tertiary-100">{props.title}</span>
        <CaretDown className="text-tertiary-200 icon" />
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
      href={props.link}
    >
      <button
        className="flex flex-row items-center justify-start w-full px-4 py-1 border-b border-tertiary-400/20 hover:bg-black/20 bg-black/10"
      >
        <span className="text-tertiary-200">{props.text}</span>
      </button>
    </Link>
  );
}