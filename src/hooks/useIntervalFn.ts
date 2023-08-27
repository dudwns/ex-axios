// 함수 호출을 통한 방법

import { useCallback, useEffect, useRef } from "react";

const useIntervalFn = (fn: () => void, ms: number) => {
  const intervalId = useRef<NodeJS.Timeout | null>();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current);

    // useRef를 사용하면 콜백 함수가 변하더라도 interval이 끝나지 않음
    intervalId.current = setInterval(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current);
  }, []);

  useEffect(() => clear, [clear]);

  return [run, clear];
};

export default useIntervalFn;
