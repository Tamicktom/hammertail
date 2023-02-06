//* Libraries imports
import { Pen } from 'phosphor-react';
import { useState } from 'react';

type Props = {
  display: boolean;
  setDisplay: (display: boolean) => void;
}

const WorldCreationModal = ({ display, setDisplay }: Props) => {
  const [worldName, setWorldName] = useState('');

  return (
    <div
      className="absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen bg-black/50"
      style={{ display: display ? 'flex' : 'none' }}
    >
      <div
        onClick={() => { setDisplay(!display); }}
        className="absolute top-0 left-0 w-screen h-screen bg-black/50"
      ></div>
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-lg gap-4 p-4 bg-white rounded-lg">
        <h2 className="text-2xl font-bold">Criar novo mundo</h2>
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <label htmlFor="worldName">Nome do mundo*</label>
          <input
            className='w-full px-2 py-1 bg-gray-100 rounded-lg'
            onChange={(e) => { setWorldName(e.target.value); }}
            id="worldName"
            type="text"
            placeholder="Flower World" />
          <button
            className="flex flex-row items-center justify-center gap-2 px-2 py-1 rounded-lg bg-gradient-to-b from-purple-500 to-purple-700"
            onClick={() => { createWorld(worldName) }}
          >
            <Pen className='w-5 h-5 text-white' />
            <span className='font-bold text-white uppercase'>Criar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

//* API code ------------------------------------------------------------------
const createWorld = async (name: string) => {
  const body = {
    name
  }
  const header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }

  const response = await fetch("/api/worlds", header);
  const data = await response.json();
  console.log(data);
}

export default WorldCreationModal