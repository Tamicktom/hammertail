//* Libraries imports
import { useState } from "react";
import { useRouter } from "next/router";

//* Hooks imports

export default function TimeLine() {
  return (
    <div className='flex justify-center items-center w-full sticky left-0 bottom-0 h-28 z-10'>
      <div className='w-full max-w-7xl h-full bg-amber-600'>
        Timeline
      </div>
    </div>
  );
}