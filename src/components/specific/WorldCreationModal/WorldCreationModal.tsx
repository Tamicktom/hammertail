//* Libraries imports
import { Root, Content, Overlay, Portal, Description, Close, Trigger, Title } from '@radix-ui/react-dialog';
import { Plus, X } from '@phosphor-icons/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

//* Types
import type { World } from '@prisma/client';

//* Components imports
import WorldImage from '../WorldImage/WorldImage';
import { WorldModalButton } from '../../common/Buttons/WorldModalButton';
import Sucess from '../../Toasts/Sucess';

//* Hooks imports
import useWorldList from '../../../hooks/specific/useWorldList';

const WorldCreationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [worldName, setWorldName] = useState('');
  const [worldStartYear, setWorldStartYear] = useState(0);
  const [worldEndYear, setWorldEndYear] = useState(0);

  const worldList = useWorldList();

  const handleWorldCreation = () => {
    createWorld(worldName, worldStartYear, worldEndYear)
      .then((world) => {
        if (world) {
          worldList.refetch();
          toast.custom((t) => (
            <Sucess
              t={t}
              topMsg='Mundo criado com sucesso!'
              bottomMsg='Comece a criar suas histórias!'
            />
          ), {
            duration: 1000,
            position: 'top-center',
          });
          setTimeout(() => {
            setIsModalOpen(false);
          }, 500);
        }
      });
  }

  return (
    <Root open={isModalOpen}>
      <Trigger asChild>
        <button
          className="flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-lg bg-gradient-to-b from-purple-500 to-purple-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="font-bold text-white uppercase">Novo Mundo</span>
        </button>
      </Trigger>

      <Portal>
        <Overlay className='fixed inset-0 z-10 flex items-center justify-center DialogOverlay' onClick={() => { setIsModalOpen(false) }} />

        <Content className='fixed z-20 flex flex-col items-center justify-start max-w-md gap-4 px-4 py-8 text-white -translate-x-1/2 -translate-y-1/2 border-2 border-solid rounded-lg DialogContent bg-neutral-800 border-tertiary-600 top-1/2 left-1/2'>
          <Title className='w-full text-2xl font-bold text-center'>
            Criar novo mundo
          </Title>
          <Description>
            Para criar um novo mundo, digite o nome dele abaixo. Em seguida adicione o ano de inicio e fim do mundo.
          </Description>

          <fieldset className='flex flex-col items-start justify-start w-full gap-2'>
            <label htmlFor="worldName" className='text-lg font-bold text-white'>Nome do mundo*</label>
            <input
              className='w-full px-2 py-1 rounded-lg bg-neutral-600 focus:outline-none'
              onChange={(e) => { setWorldName(e.target.value); }}
              id="worldName"
              type="text"
              placeholder="Flower World"
            />
          </fieldset>

          <fieldset className='flex flex-col items-start justify-start w-full gap-2'>
            <label htmlFor="worldDrscription" className='text-lg font-bold text-white'>Descrição do mundo</label>
            <textarea rows={1} maxLength={1000}
              className='w-full px-2 py-1 rounded-lg bg-neutral-600 focus:outline-none'
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled."
            />
          </fieldset>

          <div className='flex flex-row flex-wrap items-center justify-start w-full text-white'>
            <div className='w-full text-white'>
              <span className='w-full text-lg font-bold text-center'>
                Timeline
              </span>
            </div>
            <fieldset className='flex flex-col items-start justify-start w-1/2'>
              <label htmlFor="worldStartYear" className='text-base font-bold text-white '>Ano de inicio*</label>
              <input
                className='px-2 py-1 rounded-lg w-28 bg-neutral-600 focus:outline-none'
                id="worldStartYear"
                type="number"
                placeholder="0"
                onChange={(e) => { setWorldStartYear(Number(e.target.value)); }}
              />
            </fieldset>
            <fieldset className='flex flex-col items-start justify-start w-1/2'>
              <label htmlFor="worldEndYear" className='text-base font-bold text-white'>Ano de fim*</label>
              <input
                className='px-2 py-1 rounded-lg appearance-none w-28 bg-neutral-600 focus:outline-none :-webkit-outer-spin-button'
                id="worldEndYear"
                type="number"
                placeholder="1000"
                onChange={(e) => { setWorldEndYear(Number(e.target.value)); }}
              />
            </fieldset>
          </div>

          <div className='flex flex-col items-start justify-start w-full'>
            <span className='w-full text-lg font-bold text-white'>
              Imagem do mundo
            </span>
            <WorldImage />
          </div>

          <WorldModalButton onClick={handleWorldCreation} />

          <Close asChild className='absolute top-0 right-0'>
            <button
              onClick={() => { setIsModalOpen(false) }}
              className="flex flex-row items-center justify-center p-2 mt-2 mr-2 rounded-full hover:bg-purple-200"
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

export default WorldCreationModal