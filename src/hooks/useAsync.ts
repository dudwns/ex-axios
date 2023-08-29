import { useEffect } from "react";
import useAsyncFn from "./useAsyncFn";

const useAsync = (
  fn: () => Promise<{ id: number; title: string; body: string }[]>,
  deps: string[]
) => {
  const [state, callback] = useAsyncFn(fn, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};

export default useAsync;
