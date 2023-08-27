import { ChangeEvent, FormEvent, useState } from "react";
import { PostProps } from "../components/domain/PostList";

export interface FormValues {
  userId: number;
  title: string;
  body: string;
  [key: string | number]: string | number;
}

interface useFormProps {
  initialValues: PostProps;
  onSubmit: (values: PostProps) => void | Promise<void>;
  validate?: (values: PostProps) => { title?: string; body?: string };
}

const useForm = ({ initialValues, onSubmit, validate }: useFormProps) => {
  const [values, setValues] = useState<PostProps>(initialValues);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // 바뀐 input의 name과 value를 가져옴
    setValues({ ...values, [name]: value }); // 기존 값과 변경된 값을 할당
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validate ? validate(values) : {}; // validate가 존재하면 검사, 아니면 {} 할당

    // 에러가 없으면 onSubmit 실행
    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }
    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
