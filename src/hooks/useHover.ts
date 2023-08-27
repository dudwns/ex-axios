import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

const useHover = (): [MutableRefObject<HTMLDivElement | null>, boolean] => {
  const [state, setState] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseOver = useCallback(() => setState(true), []);
  const handleMouseOut = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mouseover", handleMouseOver);
    element.addEventListener("mouseout", handleMouseOut);

    return () => {
      element.removeEventListener("mouseover", handleMouseOver);
      element.removeEventListener("mouseout", handleMouseOut);
    };
  }, [ref, handleMouseOver, handleMouseOut]);

  return [ref, state];
};

export default useHover;
