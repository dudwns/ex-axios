// 함수 호출을 통한 방법

import { useCallback, useEffect, useRef } from "react";

const useTimeoutFn = (fn: () => void, ms: number) => {
  const timeoutId = useRef<NodeJS.Timeout | null>();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  // 해당 timeout을 사용하는 컴포넌트가 사라졌을 때 clear를 해주어야 함
  useEffect(() => clear, [clear]);

  return [run, clear];
};

export default useTimeoutFn;
