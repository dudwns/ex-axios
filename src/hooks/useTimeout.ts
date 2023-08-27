// 컴포넌트가 로딩 된 후 바로 실행되는 방법

import { useEffect } from "react";
import { useTimeoutFn } from ".";

const useTimeout = (fn: () => void, ms: number) => {
  const [run, clear] = useTimeoutFn(fn, ms);

  useEffect(() => {
    run();
    return clear;
  }, [run, clear]);

  return clear;
};

export default useTimeout;
