import { MutableRefObject, useEffect, useRef } from "react";

const events = ["mousedown", "touchstart"]; // 모바일은 touchstart

const useClickAway = (
  handler: (e: MouseEvent | TouchEvent) => void
): MutableRefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement | null>(null);
  const saveHandler = useRef(handler);

  // handler 함수가 변하더라도 이벤트를 remove, add 하지 않는다.
  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e: MouseEvent | TouchEvent) => {
      // event target이 해당 요소에 포함되어 있지 않으면 핸들러를 실행
      !element.contains(e.target as Node) && saveHandler.current(e);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent as EventListener);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent as EventListener);
      }
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
