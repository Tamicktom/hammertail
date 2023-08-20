import toast from 'react-hot-toast';
import Sucess from "../components/Toasts/Sucess";
import Danger from "../components/Toasts/Danger";
import Info from '../components/Toasts/Info';
import Alert from '../components/Toasts/Alert';

export default function Design() {
  return (
    <div className="bg-neutral-800 w-screen h-screen flex justify-center items-center">
      <button
        className="bg-primary-500 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          toast.custom((t) => (
            <Sucess
              t={t}
              topMsg='World created successfully!'
              bottomMsg='Start creating your stories!'
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
              topMsg='Error creating world!'
              bottomMsg='Please try again later!'
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
              topMsg='New messages!'
              bottomMsg='You have 3 new messages!'
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
              topMsg='New messages!'
              bottomMsg='You have 3 new messages!'
            />
          ));
        }}>
        create alert toast
      </button>
    </div>
  )
}