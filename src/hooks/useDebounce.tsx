import { useState, useEffect } from "react";

function useDebounce(value: any, delay = 300) {
  const [deBouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return deBouncedValue;
}

export default useDebounce;
