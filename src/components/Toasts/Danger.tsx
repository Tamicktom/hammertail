//* Libraries imports
import { XCircle, X } from 'phosphor-react';
import { useState, useEffect } from 'react';
import toast, { type Toast } from 'react-hot-toast';

type Props = {
  t: Toast,
  topMsg: string,
  bottomMsg: string
}

export default function Danger({ t, topMsg, bottomMsg }: Props) {
  const [visible, setVisible] = useState(t.visible);

  useEffect(() => {
    setVisible(t.visible);
  }, [t.visible]);

  return (
    <div
      className={`${visible ? "toast-enter" : "toast-leave"
        } max-w-md bg-tertiary-800 rounded-lg flex flex-row p-2 border-2 border-danger-500 min-h-14 gap-4`}
      onAnimationEnd={() => {
        if (!visible) {
          toast.dismiss(t.id);
        }
      }}
    >
      <div className='flex justify-center items-center p-1'>
        <XCircle className="w-8 h-8 text-danger-500" size={32} />
      </div>

      <div className='flex flex-col justify-start items-start font-primary'>
        <span className="font-normal text-sm text-danger-100">{topMsg}</span>
        <span className="font-black text-base text-danger-500">{bottomMsg}</span>
      </div>

      <div className="w-10 flex justify-end items-start h-full">
        <button
          onClick={() => toast.dismiss(t.id)}
        >
          <X className="w-6 h-6 text-tertiary-700" size={24} />
        </button>
      </div>
    </div>
  )
}