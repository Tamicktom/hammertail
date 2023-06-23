//* Libraries imports

type Props = {
  onPointerDown: () => void
  children: string;
}

export default function RainbowButton(props: Props) {
  return (
    <div className="rainbowButton w-full relative z-10">
      <button
        type="button"
        onPointerDown={props.onPointerDown}
        className="p-0.5 rounded-lg w-full bg-rainbow flex justify-center items-center cursor-pointer h-10"
      >
        <div className="w-full h-full bg-neutral-950 rounded-lg overflow-hidden flex justify-center items-center">
          <span className="text-neutral-100 uppercase font-primary font-bold text-2xl">
            {props.children}
          </span>
        </div>
      </button>
    </div>
  );
}