//* Libraries imports
import { useCallback, useEffect, useState, useRef } from "react";
import type { ElementRef } from "react";

//* Hooks imports
import useWindowSize from "../../../hooks/common/useWindowSize";

type Props = {
  min: number;
  max: number;
  onChange: (value: { min: number; max: number }) => void;
}

export default function MultiRangeSlider(props: Props) {
  const window = useWindowSize();
  const [minVal, setMinVal] = useState(props.min);
  const [maxVal, setMaxVal] = useState(props.max);
  const [width, setWidth] = useState(200);
  const minValRef = useRef(props.min);
  const maxValRef = useRef(props.max);
  const range = useRef<ElementRef<"div">>(null);
  const father = useRef<ElementRef<"div">>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - props.min) / (props.max - props.min)) * 100),
    [props.min, props.max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    props.onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  // Set width on resize
  useEffect(() => {
    if (father.current) {
      setWidth(father.current.clientWidth);
    }
  }, [window.width]);

  return (
    <div
      className="w-full h-fit items-center justify-center"
      ref={father}
    >
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb z-[3]"
        style={{
          zIndex: minVal > props.max - 100 ? "5" : "3",
          width: `${width}px`,
        }}
      />

      <input
        type="range"
        min={props.min}
        max={props.max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb z-[4]"
        style={{
          width: `${width}px`,
        }}
      />

      <div
        className="slider relative"
        style={{
          width: `${width}px`,
        }}
      >
        <div className="absolute rounded-sm h-[5px] bg-white w-full z-[1]" />
        <div ref={range} className="absolute rounded-sm h-[5px] bg-primary-500 z-[2]" />
        <div className="absolute text-neutral-700 text-xs mt-5 left-0">{minVal}</div>
        <div className="absolute text-neutral-700 text-xs mt-5 right-0">{maxVal}</div>
      </div>
    </div>
  );
};