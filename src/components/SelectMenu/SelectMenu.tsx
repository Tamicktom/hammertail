import { useRef, useEffect, useState } from 'react';
import { BlockProps, BlockTypes } from '../../types/block';
import type { Block } from '@prisma/client';

type MenuItems = {
  title: BlockTypes,
}

const menuItems: MenuItems[] = [
  {
    title: 'p',
  },
  {
    title: 'h2',
  },
  {
    title: 'h3',
  },
  {
    title: 'h4',
  },
  {
    title: 'img',
  },
  {
    title: 'todo',
  }
]

type Props = {
  spawnPosition: { x: number, y: number },
  isOpen: boolean,
  onMouseLeave: () => void,
  onMouseEnter: () => void,
  onAddBlock: (index: number, block: Block) => void,
}

export default function SelectMenu({ spawnPosition, isOpen, onMouseEnter, onMouseLeave, onAddBlock }: Props) {
  const menuOptions = menuItems;
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState<number>(0);
  const [position, setPosition] = useState(spawnPosition);

  useEffect(() => {
    if (menuRef.current)
      setMenuHeight(menuRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    setPosition(spawnPosition);
  }, [spawnPosition]);

  return (
    <div
      className='absolute w-52 h-fit rounded-lg overflow-hidden'
      style={{
        top: (position?.y - menuHeight) + 'px' ?? '0px',
        left: position?.x + 'px' ?? '0px',
        display: isOpen ? 'block' : 'none',
      }}
      ref={menuRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {
        menuOptions.map((item, index) => {
          return (
            <div
              className='w-full h-12 bg-green-600 hover:bg-green-700 cursor-pointer'
              key={index}
            >
              <button
                className='w-full h-full text-white'
                onClick={() => {
                  
                }}
              >
                {item.title}
              </button>
            </div>
          )
        })
      }
    </div>
  )
}