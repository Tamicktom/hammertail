//* libraries imports
import { useEffect, useState } from "react";

export const useDebouncer = (callback: () => void, delay: number) => {
  const [debauncedValue, setDebauncedValue] = useState<number | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, [callback, delay]);

  return debauncedValue;
};
