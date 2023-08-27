import { useEffect, useRef } from "react";

const useResize = (handler: (contentRect: DOMRectReadOnly) => void) => {
  const saveHandler = useRef(handler);
  const ref = useRef(null);

  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      // 바뀐 element를 리스트로 받음
      saveHandler.current(entries[0].contentRect); // 하지만 element 하나만 다루기 때문에 0번째를 넘김
    });

    observer.observe(element); // 해당 element가 resizing 되면 함수를 실행

    return () => {
      observer.disconnect(); // 연결을 끊음
    };
  }, [ref]);

  return ref;
};

export default useResize;
