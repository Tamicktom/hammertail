//* Libraries imports
import dynamic from 'next/dynamic';
import Image from 'next/image';

//* Component imports
import Scrollable from "../../components/common/Scrollable";
import Navbar from "../../components/specific/Navbar/Navbar";
const Sidebar = dynamic(() => import("../../components/specific/Sidebar/Sidebar"));
const TimeLine = dynamic(() => import('../../components/common/TimeLine'), { ssr: false });


type Props = {
  worldId: string;
}

export default function EmptyPageEdit(props: Props) {
  return (
    <div className="flex flex-row items-center justify-start w-screen h-screen bg-neutral-800">
      <div className='w-full min-h-screen h-full'>
        <Scrollable>
          <Navbar />
        </Scrollable>
      </div>
      <Sidebar worldId={props.worldId} />
    </div>
  );
}