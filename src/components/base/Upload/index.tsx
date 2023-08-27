import styled from "@emotion/styled";
import React, { useRef, useState, DragEvent } from "react";

interface UploadProps {
  children?:
    | React.ReactNode
    | ((file: File | null | undefined, dragging: boolean) => React.ReactNode);
  droppable?: boolean;
  name?: string;
  accept?: string;
  value?: File;
  onChange?: (file: File) => void;
}

const UploadContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const Upload = ({ children, droppable, name, accept, value, onChange, ...props }: UploadProps) => {
  const [file, setFile] = useState<File | null | undefined>(value);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const changedFile = files[0];
      setFile(changedFile);
      onChange && onChange(changedFile);
    }
  };

  const handleChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragEnter = (e: DragEvent) => {
    if (!droppable) return;

    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setDragging(true);
      }
    }
  }; // 드래그를 통해 컴포넌트에 들어왔을 때

  const handleDragLeave = (e: DragEvent) => {
    if (!droppable) return;

    e.preventDefault();
    e.stopPropagation();

    setDragging(false);
  }; // 드래그를 통해 컴포넌트를 나갈 때

  const handleDragOver = (e: DragEvent) => {
    if (!droppable) return;

    e.preventDefault();
    e.stopPropagation();
  }; // 이벤트 전파를 막기위해 정의

  const handleFileDrop = (e: DragEvent) => {
    if (!droppable) return;

    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer) {
      const files = e.dataTransfer.files;
      const changedFile = files[0];
      setFile(changedFile);
      onChange && onChange(changedFile);
      setDragging(false);
    }
  }; // 파일을 컴포넌트 위에 놓았을 때

  return (
    <UploadContainer
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...props}
    >
      <Input ref={inputRef} type="file" name={name} accept={accept} onChange={handleFileChange} />
      {typeof children === "function" ? children(file, dragging) : children}
    </UploadContainer>
  );
};

export default Upload;
