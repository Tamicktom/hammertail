//* Libraries imports
import { Root, Content, Overlay, Portal, Description, Close, Trigger, Title } from '@radix-ui/react-dialog';
import { Pen, Plus, X } from '@phosphor-icons/react';
import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';

//* Types
import type { World } from '@prisma/client';

//* Components imports
import WorldImage from '../WorldImage/WorldImage';
import Sucess from '../../Toasts/Sucess';
import CreateCharacterForm from './components/CreateCharacterForm';
import CreatePlaceForm from './components/CreatePlaceForm';
import CreateEventForm from './components/CreateEventForm';
import CreateItemForm from './components/CreateItemForm';

//* Store imports
import worldStore from '../../../store/common/world';

type PageTypes = 'characters' | 'places' | 'events' | 'items';

type Props = {
  worldId: string;
}

const PageCreationModal = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeOfPage, setTypeOfPage] = useState<PageTypes>('characters');

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

          <div>
            <select
              name=""
              id=""
              onChange={(e) => { setTypeOfPage(e.target.value as PageTypes) }}
              className='w-full px-4 py-2 rounded-lg bg-gray-100'
            >
              <option value="characters">Character</option>
              <option value="places">Place</option>
              <option value="events">Event</option>
              <option value="items">Item</option>
            </select>
          </div>

          {typeOfPage === 'characters' && <CreateCharacterForm worldId={props.worldId} />}
          {typeOfPage === 'places' && <CreatePlaceForm worldId={props.worldId} />}
          {typeOfPage === 'events' && <CreateEventForm worldId={props.worldId} />}
          {typeOfPage === 'items' && <CreateItemForm worldId={props.worldId} />}

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

export default PageCreationModal;