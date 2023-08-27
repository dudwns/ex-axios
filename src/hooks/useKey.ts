import { useCallback, useEffect } from "react";

const useKey = (event: string = "keydown", targetKey: string, handler: () => void) => {
  const handleKey = useCallback(
    ({ key }: KeyboardEvent) => {
      // 누른 키가 targetKey와 같다면 handler 실행
      if (key === targetKey) {
        handler();
      }
    },
    [targetKey, handler]
  );

  useEffect(() => {
    window.addEventListener(event, handleKey as EventListener);

    return () => {
      window.removeEventListener(event, handleKey as EventListener);
    };
  }, [event, targetKey, handleKey]);
};

export default useKey;
