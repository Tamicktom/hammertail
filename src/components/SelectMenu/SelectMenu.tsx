import { useRef, useEffect, useState } from 'react';

const menuItems = [
  {
    title: 'p',
    onClick: () => console.log('p'),
  },
  {
    title: 'h2',
    onClick: () => console.log('h2'),
  },
  {
    title: 'h3',
    onClick: () => console.log('h3'),
  },
  {
    title: 'h4',
    onClick: () => console.log('h4'),
  },
]

type Props = {
  spawnPosition: { x: number, y: number },
  isOpen: boolean,
  onMouseLeave: () => void,
  onMouseEnter: () => void,
}

export default function SelectMenu({ spawnPosition, isOpen, onMouseEnter, onMouseLeave }: Props) {
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
              <button onClick={item.onClick}>{item.title}</button>
            </div>
          )
        })
      }
    </div>
  )
}