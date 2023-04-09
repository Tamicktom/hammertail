//* Libraries imports
import { useEffect, useRef } from "react";

/**
 * @description This hook is used to execute a function only once after the component is mounted.
 *
 * @param fn The function to be executed.
 */

export default function useDidMountEffect(fn: () => void) {
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      fn();
    }
  }, [fn]);
}
