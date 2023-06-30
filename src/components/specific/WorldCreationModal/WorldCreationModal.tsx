//* Libraries imports
import { Root, Content, Overlay, Portal, Description, Close, Trigger, Title } from '@radix-ui/react-dialog';
import { Plus, X } from '@phosphor-icons/react';
import { useState, FormEvent } from 'react';
import toast from 'react-hot-toast';
import z from "zod";
import axios from 'axios';

//* Types
import type { World } from '@prisma/client';

//* Components imports
import WorldImage from '../WorldImage/WorldImage';
import { WorldModalButton } from '../../common/Buttons/WorldModalButton';
import Sucess from '../../Toasts/Sucess';

//* Hooks imports
import useWorldList from '../../../hooks/specific/useWorldList';

const worldCreationSchema = z.object({
  name: z.string().min(3).max(255),
  startYear: z.number().min(0).max(999999),
  endYear: z.number().min(0).max(999999),
  description: z.string().max(512).optional(),
  image: z.boolean(),
  imageMimeType: z
    .enum(["image/png", "image/jpeg", "image/jpg", "image/gif", ""])
    .optional(),
});

type WorldCreationSchema = z.infer<typeof worldCreationSchema>;

const WorldCreationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [worldName, setWorldName] = useState('');
  const [worldStartYear, setWorldStartYear] = useState(0);
  const [worldEndYear, setWorldEndYear] = useState(0);

  const worldList = useWorldList();

  const handleWorldCreation = (form: FormEvent) => {
    form.preventDefault();

    if (!(form.target instanceof HTMLFormElement)) {
      return;
    }

    const formData = new FormData(form.target);

    createWorld(formData)
      .then((data) => {
        if (data) {
          console.log("validando dados")
          if (data.error && data.message) {
            toast.error(data.message);
            return;
          }

          if (data.uploadLink && data.message === "World created successfully.") {
            console.log("enviando imagem")
            const { signedUrl, path, token } = data.uploadLink.data;
            const file = formData.get('worldImage') as File;

            axios.put(signedUrl, file, {
              headers: {
                'Content-Type': file.type,
                Authorization: `Bearer ${token}`,
              },
            }).then((response) => {
              if (response.status === 200) {
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
            }).catch((error) => {
              toast.error('Erro ao enviar imagem!');
              console.log(error);
            });
          } else {
            console.log("sem imagem")
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
          worldList.refetch();
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
          <form onSubmit={handleWorldCreation}>
            <Title className='w-full text-2xl font-bold text-center'>
              Criar novo mundo
            </Title>
            <Description>
              Para criar um novo mundo, digite o nome dele abaixo. Em seguida adicione o ano de inicio e fim do mundo.
            </Description>

            <fieldset className='flex flex-col items-start justify-start w-full gap-2'>
              <label htmlFor="name" className='text-lg font-bold text-white'>World's name*</label>
              <input
                className='w-full px-2 py-1 rounded-lg bg-neutral-600 focus:outline-none'
                onChange={(e) => { setWorldName(e.target.value); }}
                id="name"
                name="name"
                type="text"
                placeholder="Flower World"
              />
            </fieldset>

            <fieldset className='flex flex-col items-start justify-start w-full gap-2'>
              <label htmlFor="description" className='text-lg font-bold text-white'>World's description</label>
              <textarea
                rows={1}
                maxLength={512}
                id="description"
                name="description"
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
                <label htmlFor="startYear" className='text-base font-bold text-white '>Ano de inicio*</label>
                <input
                  className='px-2 py-1 rounded-lg w-28 bg-neutral-600 focus:outline-none'
                  id="startYear"
                  name="startYear"
                  type="number"
                  placeholder="0"
                />
              </fieldset>
              <fieldset className='flex flex-col items-start justify-start w-1/2'>
                <label htmlFor="endYear" className='text-base font-bold text-white'>Ano de fim*</label>
                <input
                  className='px-2 py-1 rounded-lg appearance-none w-28 bg-neutral-600 focus:outline-none :-webkit-outer-spin-button'
                  id="endYear"
                  name="endYear"
                  type="number"
                  placeholder="1000"
                />
              </fieldset>
            </div>

            <div className='flex flex-col items-start justify-start w-full'>
              <span className='w-full text-lg font-bold text-white'>
                Image of the world
              </span>
              <WorldImage />
            </div>

            <input type="submit" value="Criar mundo" />

            <Close asChild className='absolute top-0 right-0'>
              <button
                onClick={() => { setIsModalOpen(false) }}
                className="flex flex-row items-center justify-center p-2 mt-2 mr-2 rounded-full hover:bg-purple-200"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </Close>
          </form>
        </Content>
      </Portal>
    </Root>
  );
}

type ApiResponse = {
  error?: boolean;
  message: string;
  world?: World;
  uploadLink?: {
    data: {
      signedUrl: string;
      path: string;
      token: string;
    },
    error: null | string;
  }
}

//* API code ------------------------------------------------------------------
const createWorld = async (formData: FormData) => {
  let hasImage: FormDataEntryValue | null | boolean = formData.get('worldImage');
  let imageMimeType = "";

  if (hasImage instanceof File) {
    if (hasImage.size === 0 || hasImage.name === '')
      hasImage = false

    else {
      imageMimeType = hasImage.type;
      if (imageMimeType === 'image/png' || imageMimeType === 'image/jpeg' || imageMimeType === 'image/jpg' || imageMimeType === 'image/gif')
        hasImage = true;
      else
        hasImage = false;
    };
  }
  else { hasImage = false };

  const worldCreationData: WorldCreationSchema = {
    name: formData.get('name') as string,
    startYear: Number(formData.get('startYear')),
    endYear: Number(formData.get('endYear')),
    description: formData.get('description') as string,
    image: hasImage,
    imageMimeType: validadeImageType(imageMimeType),
  };

  const response = await axios.post<ApiResponse>('/api/worlds', worldCreationData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.status === 200) {
    return response.data;
  }
}

function validadeImageType(imgType: string): "" | "image/png" | "image/jpeg" | "image/jpg" | "image/gif" {
  if (imgType === 'image/png' || imgType === 'image/jpeg' || imgType === 'image/jpg' || imgType === 'image/gif')
    return imgType;
  else
    return "";
}

export default WorldCreationModal