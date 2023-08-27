// 컴포넌트가 로딩 된 후 바로 실행되는 방법

import { useEffect } from "react";
import { useIntervalFn } from ".";

const useInterval = (fn: () => void, ms: number) => {
  const [run, clear] = useIntervalFn(fn, ms);

  useEffect(() => {
    run();
    return clear;
  }, [run, clear]);

  return clear;
};

export default useInterval;
