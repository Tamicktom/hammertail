

//* Component import
import { Navbar } from "../../components/Navbar/Navbar";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { BlocksPage } from "../../components/BlocksPage/BlocksPage";

export default function Editable() {

  return (
    <div className="w-screen h-screen bg-gray-700 flex flex-row justify-start items-start">
      <div className="h-full w-full">
        <Navbar />
        <BlocksPage />
      </div>
      <Sidebar />
    </div>
  );
}