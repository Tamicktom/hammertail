//* Libraries imports
import { Page as Enchanto } from "enchanto";
import { DotsSixVertical, Plus } from '@phosphor-icons/react';

import type { Page } from "@prisma/client";

type Props = {
  page: Page;
}

export default function TextEditor(props: Props) {
  return (
    <Enchanto
      dragIcon={<DotsSixVertical />}
      addIcon={<Plus />}
      initialState={[
        {
          id: crypto.randomUUID(),
          type: "heading",
          content: "<h1>Heading</h1>",
          children: [],
          order: 0,
          props: {},
        },
        {
          id: crypto.randomUUID(),
          type: "paragraph",
          content: "<p>Hello World!</p>",
          children: [],
          order: 1,
          props: {},
        },
      ]}
      className='w-full h-full text-white'
      onChange={(state) => { console.log(state) }}
    />
  );
}