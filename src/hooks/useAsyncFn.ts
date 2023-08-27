import { useCallback, useRef, useState } from "react";

export interface useAsyncFnState {
  isLoading: boolean;
  value?: { id: number; title: string; body: string }[];
  error?: object[];
}

const useAsyncFn = (
  fn: () => Promise<{ id: number; title: string; body: string }[]>,
  deps: object[]
): [useAsyncFnState, () => Promise<object[]>] => {
  const lastCallId = useRef(0);
  const [state, setState] = useState<useAsyncFnState>({
    isLoading: false,
    value: undefined,
    error: undefined,
  });

  const callback = useCallback(() => {
    const callId = ++lastCallId.current;
    if (!state.isLoading) {
      setState({ ...state, isLoading: true });
    }

    return fn().then(
      (value) => {
        callId === lastCallId.current && setState({ value, isLoading: false });
        return value;
      },
      (error) => {
        callId === lastCallId.current && setState({ error, isLoading: false });
        return error;
      }
    );
    //eslint-disable-next-line
  }, deps);

  return [state, callback];
};

export default useAsyncFn;
