//* Libraries imports
import { Root, Content, Overlay, Portal, Description, Close, Trigger, Title } from '@radix-ui/react-dialog';
import { Pen, Plus, X } from '@phosphor-icons/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

//* Types
import type { World } from '@prisma/client';

//* Components imports
import WorldImage from '../WorldImage/WorldImage';
import { WorldModalButton } from '../../common/Buttons/WorldModalButton';

//* Store imports
import worldStore from '../../../store/common/world';
import Sucess from '../../Toasts/Sucess';

const WorldCreationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [worldName, setWorldName] = useState('');
  const [worldStartYear, setWorldStartYear] = useState(0);
  const [worldEndYear, setWorldEndYear] = useState(0);

  const worldList = worldStore((state) => state.worlds);
  const updateWorldList = worldStore((state) => state.updateWorlds);

  const handleWorldCreation = () => {
    createWorld(worldName, worldStartYear, worldEndYear)
      .then((world) => {
        if (world) {
          updateWorldList([...worldList, world]);
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
          }, 1000);
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
        <Overlay className='fixed inset-0 flex items-center justify-center DialogOverlay' onClick={() => { setIsModalOpen(false) }} />

        <Content className='DialogContent bg-neutral-800 border-tertiary-600 border-solid border-2 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md px-4 py-8 flex flex-col justify-start items-center text-white gap-4'>
          <Title className='w-full text-center font-bold text-2xl'>
            Criar novo mundo
          </Title>
          <Description>
            Para criar um novo mundo, digite o nome dele abaixo. Em seguida adicione o ano de inicio e fim do mundo.
          </Description>

          <fieldset className='w-full flex flex-col justify-start items-start gap-2'>
            <label htmlFor="worldName" className='font-bold text-lg  text-white'>Nome do mundo*</label>
            <input
              className='w-full px-2 py-1 rounded-lg bg-neutral-600 focus:outline-none'
              onChange={(e) => { setWorldName(e.target.value); }}
              id="worldName"
              type="text"
              placeholder="Flower World"
            />
          </fieldset>

          <fieldset className='w-full flex flex-col justify-start items-start gap-2'>
            <label htmlFor="worldDrscription" className='font-bold text-lg  text-white'>Descrição do mundo</label>
            <textarea rows={1} maxLength={1000}
              className='w-full px-2 py-1 rounded-lg bg-neutral-600 focus:outline-none'
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled."
            />
          </fieldset>

          <div className='w-full flex flex-row  text-white justify-start items-center flex-wrap'>
            <div className='w-full text-white'>
              <span className='font-bold  text-lg w-full text-center'>
                Timeline
              </span>
            </div>
            <fieldset className='w-1/2 flex flex-col justify-start items-start'>
              <label htmlFor="worldStartYear" className='font-bold text-base   text-white '>Ano de inicio*</label>
              <input
                className='w-28 px-2 py-1 bg-neutral-600 rounded-lg focus:outline-none'
                id="worldStartYear"
                type="number"
                placeholder="0"
                onChange={(e) => { setWorldStartYear(Number(e.target.value)); }}
              />
            </fieldset>
            <fieldset className='w-1/2 flex flex-col justify-start items-start'>
              <label htmlFor="worldEndYear" className='font-bold text-base  text-white'>Ano de fim*</label>
              <input
                className='w-28 px-2 py-1 bg-neutral-600 rounded-lg focus:outline-none appearance-none :-webkit-outer-spin-button'
                id="worldEndYear"
                type="number"
                placeholder="1000"
                onChange={(e) => { setWorldEndYear(Number(e.target.value)); }}
              />
            </fieldset>
          </div>

          <div className='w-full flex flex-col justify-start items-start'>
            <span className='font-bold  text-white text-lg w-full'>
              Imagem do mundo
            </span>
            <WorldImage />
          </div>

          <WorldModalButton onClick={handleWorldCreation} />

          <Close asChild className='absolute top-0 right-0'>
            <button
              onClick={() => { setIsModalOpen(false) }}
              className="flex flex-row items-center justify-center p-2 rounded-full hover:bg-purple-200 mr-2 mt-2"
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