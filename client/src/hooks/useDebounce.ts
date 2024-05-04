import { useState, useEffect } from "react";
function useDebounce(value: any, delay: number) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [value]);
  return debounce;
}

export default useDebounce;
