import { useEffect } from "react";
import { useTimeoutFn } from ".";

const useDebounce = (fn: () => void, ms: number, deps: string[]) => {
  const [run, clear] = useTimeoutFn(fn, ms);

  // deps가 변경될 때 마다 run이 다시 실행됨
  // 특정 초 이내에 deps가 변경되면 기존에 실행되던 setTiemout은 종료되고 다시 시작하게 됨

  // eslint-disable-next-line
  useEffect(run, deps);

  return clear;
};

export default useDebounce;
