type RainbowBordersProps = {
  children: React.ReactNode;
  borderRadius?: number;
};

export default function RainbowBorders({ children, borderRadius }: RainbowBordersProps) {
  return (
    <div className="relative z-10 flex items-center justify-center w-full max-w-4xl">
      <div className="relative w-full rainbowDiv">
        <div
          className="p-0.5 w-full flex justify-center flex-col items-center h-fit"
          style={{
            borderRadius: borderRadius ? borderRadius : "0.5rem",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}