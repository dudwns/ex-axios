import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import ToastItem from "./ToastItem";
import { CreateToastFunction } from ".";
import styled from "@emotion/styled";

const Container = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1500;
`;

interface ToastsValue {
  id: string;
  message: string;
  duration: number;
}

interface ToastManagerProps {
  bind: (createToast: CreateToastFunction) => void;
}

const ToastManager = ({ bind }: ToastManagerProps) => {
  const [toasts, setToasts] = useState<ToastsValue[]>([]);

  const createToast = useCallback((message: string, duration: number) => {
    const newToast = {
      id: v4(),
      message,
      duration,
    };
    setToasts((oldToasts: ToastsValue[]) => [...oldToasts, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    bind(createToast);
  }, [bind, createToast]);

  return (
    <Container>
      {toasts.map(({ id, message, duration }) => (
        <ToastItem message={message} duration={duration} key={id} onDone={() => removeToast(id)} />
      ))}
    </Container>
  );
};

export default ToastManager;
