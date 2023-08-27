import styled from "@emotion/styled";

const Wrapper = styled.div<WrapperProps>`
  display: ${({ block }) => (block ? "block" : "inline-block")};
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
`;

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? "red" : "gray")};
  border-radius: 4px;
  box-sizing: border-box;
`;

interface WrapperProps {
  block: boolean;
}

interface StyledInputProps {
  invalid: boolean;
}

interface InputProps {
  label: string;
  block: boolean;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  wrapperProps: { [key: string]: unknown };
}

const Input = ({
  label,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  readonly = false,
  wrapperProps,
  ...props
}: InputProps) => {
  return (
    <Wrapper block={block} {...wrapperProps}>
      <Label>{label}</Label>
      <StyledInput
        invalid={invalid}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        {...props}
      />
    </Wrapper>
  );
};

export default Input;
