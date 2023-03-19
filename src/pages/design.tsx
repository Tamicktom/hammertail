import toast from 'react-hot-toast';
import Sucess from "../components/Toasts/Sucess";
import Danger from "../components/Toasts/Danger";
import Info from '../components/Toasts/Info';
import Alert from '../components/Toasts/Alert';

export default function Design() {
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
        create sucess toast
      </button>
      <button
        className="bg-primary-500 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          toast.custom((t) => (
            <Danger
              t={t}
              topMsg='Erro ao criar mundo!'
              bottomMsg='Tente novamente mais tarde!'
            />
          ));
        }}>
        create danger toast
      </button>
      <button
        className="bg-primary-500 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          toast.custom((t) => (
            <Info
              t={t}
              topMsg='Novas mensagens!'
              bottomMsg='Você tem 3 novas mensagens!'
            />
          ));
        }}>
        create info toast
      </button>
      <button
        className="bg-primary-500 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          toast.custom((t) => (
            <Alert
              t={t}
              topMsg='Novas mensagens!'
              bottomMsg='Você tem 3 novas mensagens!'
            />
          ));
        }}>
        create alert toast
      </button>
    </div>
  )
}