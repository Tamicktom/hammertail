import toast from 'react-hot-toast';
import Sucess from "../components/Toasts/Sucess";

type Props = {}

export default function Design({ }: Props) {
  return (
    <div className="bg-tertiary-800 w-screen h-screen flex justify-center items-center">
      <button
        className="bg-primary-500 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          toast.custom((t) => (
            <Sucess
              t={t}
              topMsg='Mundo criado com sucesso!'
              bottomMsg='Comece a criar suas histórias!'
            />
          ));
        }}>
        criar sucesso
      </button>
    </div>
  )
}