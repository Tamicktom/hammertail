//* Libraries imports

type Props = {
  onPointerDown: () => void
  children: string;
}

export default function RainbowButton(props: Props) {
  return (
    <div className="rainbowButton w-1/2 relative z-10">
      <div
        onPointerDown={props.onPointerDown}
        className="p-0.5 rounded-lg w-full bg-rainbow flex justify-center items-center cursor-pointer h-10"
      >
        <div className="w-full h-full bg-neutral-950 rounded-lg overflow-hidden flex justify-center items-center">
          <span className="text-neutral-100 uppercase font-primary font-bold text-2xl">
            {props.children}
          </span>
        </div>
      </div>
    </div>
  );
}