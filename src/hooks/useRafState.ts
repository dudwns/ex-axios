import { useCallback, useRef, useState } from "react";

const useRafState = (initialState: {
  x: number;
  y: number;
}): [{ x: number; y: number }, (value: { x: number; y: number }) => void] => {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  // 이벤트가 발생했는데 이전 이벤트가 있다면 취소하고 새로운 이벤트를 전달
  const setRafState = useCallback((value: { x: number; y: number }) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  return [state, setRafState];
};

export default useRafState;
