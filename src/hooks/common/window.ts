//* Libraries imports
import { useEffect, useState, useLayoutEffect } from "react";

export const useWindowResize = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener("resize", callback);
    return () => window.removeEventListener("resize", callback);
  }, [callback]);
};

export const useWindowScroll = (callback: () => void) => {
  useEffect(() => {
    window.addEventListener("scroll", callback);
    return () => window.removeEventListener("scroll", callback);
  }, [callback]);
};

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
