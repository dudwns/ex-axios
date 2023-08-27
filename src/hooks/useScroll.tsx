import { MutableRefObject, useEffect, useRef } from "react";
import { useRafState } from ".";

const useScroll = (): [MutableRefObject<HTMLDivElement | null>, { x: number; y: number }] => {
  const [state, setState] = useRafState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      if (!ref.current) return;
      setState({
        x: ref.current?.scrollLeft,
        y: ref.current?.scrollTop,
      });
    };

    // passive가 true일 경우 브라우저가 preventDefault를 체크하지 않아서 약간의 성능 최적화가 발생
    element.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [ref, setState]);

  return [ref, state];
};

export default useScroll;
