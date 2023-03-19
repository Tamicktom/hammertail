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

        <Content className='DialogContent bg-white rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md px-4 py-8 flex flex-col justify-start items-center gap-4'>
          <Title className='w-full text-center text-black font-bold text-2xl'>
            Criar novo mundo
          </Title>
          <Description>
            Para criar um novo mundo, digite o nome dele abaixo. Em seguida adicione o ano de inicio e fim do mundo.
          </Description>

          <fieldset className='w-full flex flex-col justify-start items-start gap-2'>
            <label htmlFor="worldName" className='font-bold text-lg text-black'>Nome do mundo*</label>
            <input
              className='w-full px-2 py-1 bg-gray-100 rounded-lg'
              onChange={(e) => { setWorldName(e.target.value); }}
              id="worldName"
              type="text"
              placeholder="Flower World"
            />
          </fieldset>

          <div className='w-full flex flex-row justify-start items-center flex-wrap'>
            <div className='w-full'>
              <span className='font-bold text-black text-lg w-full text-center'>
                Timeline
              </span>
            </div>
            <fieldset className='w-1/2 flex flex-col justify-start items-start'>
              <label htmlFor="worldStartYear" className='font-bold text-base text-black'>Ano de inicio*</label>
              <input
                className='w-28 px-2 py-1 bg-gray-100 rounded-lg'
                id="worldStartYear"
                type="number"
                placeholder="0"
                onChange={(e) => { setWorldStartYear(Number(e.target.value)); }}
              />
            </fieldset>
            <fieldset className='w-1/2 flex flex-col justify-start items-start'>
              <label htmlFor="worldEndYear" className='font-bold text-base text-black'>Ano de fim*</label>
              <input
                className='w-28 px-2 py-1 bg-gray-100 rounded-lg'
                id="worldEndYear"
                type="number"
                placeholder="1000"
                onChange={(e) => { setWorldEndYear(Number(e.target.value)); }}
              />
            </fieldset>
          </div>

          <div className='w-full flex flex-col justify-start items-start'>
            <span className='font-bold text-black text-lg w-full'>
              Imagem do mundo
            </span>
            <WorldImage />
          </div>

          <button
            className="flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-lg bg-gradient-to-b from-purple-500 to-purple-700"
            onClick={handleWorldCreation}
          >
            <Pen className='w-5 h-5 text-white' />
            <span className='font-bold text-white uppercase'>Criar</span>
          </button>

          <Close asChild className='absolute top-0 right-0'>
            <button
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