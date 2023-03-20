//* Libraries imports
import { Root, Content, Overlay, Portal, Description, Close, Trigger, Title } from '@radix-ui/react-dialog';
import { Pen, Plus, X } from 'phosphor-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

//* Types
import type { World } from '@prisma/client';

//* Components imports
import WorldImage from '../WorldImage/WorldImage';
import Sucess from '../../Toasts/Sucess';

//* Store imports
import worldStore from '../../../store/common/world';

const PageCreationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageCreation = () => {
    console.log("creating page");
  }

  return (
    <Root open={isModalOpen}>
      <Trigger asChild>
        <button
          className="flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-lg bg-gradient-to-b from-purple-500 to-purple-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="font-bold text-white uppercase">New page</span>
        </button>
      </Trigger>

      <Portal>
        <Overlay className='fixed inset-0 flex items-center justify-center DialogOverlay' onClick={() => { setIsModalOpen(false) }} />

        <Content className='DialogContent bg-white rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md px-4 py-8 flex flex-col justify-start items-center gap-4'>
          <Title className='w-full text-center text-black font-bold text-2xl'>
            Criar nova página
          </Title>
          <Description>
            Para criar uma nova página, primeiro escolha o tipo de página que deseja criar.
          </Description>



          <button
            className="flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-lg bg-gradient-to-b from-purple-500 to-purple-700"
            onClick={handlePageCreation}
          >
            <Pen className='w-5 h-5 text-white' />
            <span className='font-bold text-white uppercase'>Criar</span>
          </button>

          <Close asChild className='absolute top-0 right-0'>
            <button
              className="flex flex-row items-center justify-center p-2 rounded-full hover:bg-purple-200 mr-2 mt-2"
              onClick={() => { setIsModalOpen(false) }}
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  );
}




type ApiResponse = {
  message: "World created successfully";
  world: World;
}

//* API code ------------------------------------------------------------------
const createWorld = async (name: string, startYear: number, endYear: number) => {
  const body = {
    name, startYear, endYear
  }
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }

  const response = await fetch("/api/worlds", header);
  const data: ApiResponse = await response.json();
  if (data.message === "World created successfully") {
    return data.world;
  }
}

export default PageCreationModal;