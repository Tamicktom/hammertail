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
import Sucess from '../../Toasts/Sucess';
import Danger from "../../Toasts/Danger";

//* Hooks imports
import useWorldList from '../../../hooks/specific/useWorldList';

const worldCreationSchema = z.object({
  name: z.string().min(3, {
    message: "The name must be at least 3 characters long.",
  }).max(255, {
    message: "The name must be at most 255 characters long.",
  }),

  startYear: z.number().min(0, {
    message: "The start year must be at least 0.",
  }).max(999999, {
    message: "The start year must be at most 999999.",
  })
    .refine((num) => {
      //verify if it contains a non number character
      const dictionary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const numString = num.toString();
      for (let i = 0; i < numString.length; i++) {
        const element = numString[i];
        if (element === undefined) return false;
        if (!dictionary.includes(element)) {
          return false;
        }
      }
      return true;
    }, {
      message: "The start year must be a number.",
    }),

  endYear: z.number().min(0).max(999999, {
    message: "The end year must be at most 999999.",
  }).refine((num) => {
    //verify if it contains a non number character
    const dictionary = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const numString = num.toString();
    for (let i = 0; i < numString.length; i++) {
      const element = numString[i];
      if (element === undefined) return false;
      if (!dictionary.includes(element)) {
        return false;
      }
    }
    return true;
  }, {
    message: "The end year must be a number.",
  }).refine((num) => {
    // verify if the end year is greater than the start year
    const startYear = document.getElementById('startYear');
    if (!(startYear instanceof HTMLInputElement)) return false;
    const startYearValue = Number(startYear.value);
    if (num < startYearValue) return false;
    return true;
  }, {
    message: "The end year must be greater than the start year.",
  }),

  description: z.string().max(512, {
    message: "The description must be at most 512 characters long.",
  }).optional(),

  image: z.boolean(),

  imageMimeType: z
    .enum(["image/png", "image/jpeg", "image/jpg", "image/gif", ""], {
      invalid_type_error: "The image must be a png, jpeg, jpg or gif file.",
    })
    .optional(),
});

type WorldCreationSchema = z.infer<typeof worldCreationSchema>;

export default function WorldCreationModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const worldList = useWorldList();

  const handleWorldCreation = (form: FormEvent) => {
    form.preventDefault();

    if (!(form.target instanceof HTMLFormElement)) {
      return;
    }

    const formData = new FormData(form.target);

    const validationResult = validateCreateWorldData(formData);

    if (validationResult.error) {
      return validationResult.errors?.errors.forEach((error) => {
        toast.custom((t) => (
          <Danger
            t={t}
            topMsg='Error creating world!'
            bottomMsg={error.message}
          />
        ), {
          duration: 1000,
          position: 'top-center',
        });
      });
    }

    createWorld(validationResult.data)
      .then((data) => {
        if (data) {
          if (data.error && data.message) {
            toast.error(data.message);
            return;
          }

          if (data.uploadLink && data.message === "World created successfully.") {
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
            })
          } else {
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
          setTimeout(() => {
            worldList.refetch();
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
        <Overlay
          className='fixed inset-0 z-10 flex items-center justify-center DialogOverlay'
          onClick={() => { setIsModalOpen(false) }}
        />

        <Content className='fixed z-20 flex flex-col items-center justify-start max-w-md gap-4 px-4 py-8 text-white -translate-x-1/2 -translate-y-1/2 border-2 border-solid rounded-lg DialogContent bg-neutral-800 border-tertiary-600 top-1/2 left-1/2'>
          <form onSubmit={handleWorldCreation}>
            <Title className='w-full text-2xl font-bold text-center'>
              Criar novo mundo
            </Title>
            <Description>
              Para criar um novo mundo, digite o nome dele abaixo. Em seguida adicione o ano de inicio e fim do mundo.
            </Description>

            <fieldset className='flex flex-col items-start justify-start w-full gap-2'>
              <label htmlFor="name" className='text-lg font-bold text-white'>World&apos;s name*</label>
              <input
                className='w-full px-2 py-1 rounded-lg bg-neutral-600 focus:outline-none'
                id="name"
                name="name"
                type="text"
                placeholder="Flower World"
              />
            </fieldset>

            <fieldset className='flex flex-col items-start justify-start w-full gap-2'>
              <label htmlFor="description" className='text-lg font-bold text-white'>World&apos;s description</label>
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
                  step="1"
                  onInput={(e) => {
                    const target = e.target;
                    if (!(target instanceof HTMLInputElement)) return;
                    const value = target.value;
                    if (value.length > 6) {
                      target.value = value.slice(0, 6);
                    }
                    // remove leading zeros
                    if (value.length > 1 && value[0] === '0') {
                      target.value = value.slice(1);
                    }
                    // remove non-numeric characters
                    target.value = target.value.replace(/[^0-9]/g, '');
                  }}
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
                  step="1"
                  onInput={(e) => {
                    const target = e.target;
                    if (!(target instanceof HTMLInputElement)) return;
                    const value = target.value;
                    if (value.length > 6) {
                      target.value = value.slice(0, 6);
                    }
                    // remove leading zeros
                    if (value.length > 1 && value[0] === '0') {
                      target.value = value.slice(1);
                    }
                    // remove non-numeric characters
                    target.value = target.value.replace(/[^0-9]/g, '');
                  }}
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

const createWorld = async (worldCreationData: WorldCreationSchema) => {
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

function validateCreateWorldData(formData: FormData) {
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
    }
  }
  else { hasImage = false }

  const worldCreationData: WorldCreationSchema = {
    name: formData.get('name') as string,
    startYear: Number(formData.get('startYear')),
    endYear: Number(formData.get('endYear')),
    description: formData.get('description') as string,
    image: hasImage,
    imageMimeType: validadeImageType(imageMimeType),
  };

  const validationResult = worldCreationSchema.safeParse(worldCreationData);

  if (!validationResult.success) {
    return {
      error: true,
      errors: validationResult.error,
      data: worldCreationData,
    }
  }

  return {
    error: false,
    data: worldCreationData,
  }
}