import styled from "@emotion/styled";

const Wrapper = styled.div<WrapperProps>`
  display: ${({ block }) => (block ? "block" : "inline-block")};
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
`;

const StyledSelect = styled.select<StyledInputProps>`
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

type DataType = { label: string; value: string } | string;

interface SelectProps {
  data: DataType[];
  label: string;
  placeholder: string;
  block: boolean;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  wrapperProps: { [key: string]: unknown };
}

const Select = ({
  data,
  label,
  placeholder,
  block = false,
  invalid = false,
  required = false,
  disabled = false,
  wrapperProps,
  ...props
}: SelectProps) => {
  // 1. String
  // 2. Object {labe: string, value: string}

  const formattedData = data.map((item: string | { label: string; value: string }) =>
    typeof item === "string" ? { label: item, value: item } : item
  );

  const options = formattedData.map((item: { label: string; value: string }) => (
    <option key={item.value} value={item.value}>
      {item.label}
    </option>
  ));

  if (placeholder) {
    options.unshift(
      <option key="placeholder" value="" hidden>
        {placeholder}
      </option>
    );
  }

  return (
    <Wrapper block={block} {...wrapperProps}>
      <Label>{label}</Label>
      <StyledSelect invalid={invalid} required={required} disabled={disabled} {...props}>
        {options}
      </StyledSelect>
    </Wrapper>
  );
};

export default Select;
