import { CSSProperties, useMemo } from "react";
import FluxProvider from "./FluxProvider";
import styled from "@emotion/styled";

const AlignToCssValue = {
  top: "flex-start",
  middle: "center",
  bottom: "flex-end",
};

const StyledRow = styled.div<StyledRowProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;

  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => AlignToCssValue[align]};
`;

interface StyledRowProps {
  justify: "start" | "center" | "end";
  align: "top" | "middle" | "bottom";
}

interface RowProps {
  children?: React.ReactNode;
  justify?: "start" | "center" | "end";
  align?: "top" | "middle" | "bottom";
  gutter: number | number[];
  style?: CSSProperties;
}

const Row = ({ children, justify = "center", align = "middle", gutter, ...props }: RowProps) => {
  const gutterStyle = useMemo(() => {
    if (Array.isArray(gutter)) {
      const horizontalGutter = gutter[0];
      const verticalGutter = gutter[1];
      return {
        marginTop: `-${verticalGutter / 2}px`,
        marginBottom: `-${verticalGutter / 2}px`,
        marginLeft: `-${horizontalGutter / 2}px`,
        marginRight: `-${horizontalGutter / 2}px`,
      };
    } else {
      return {
        marginLeft: `-${gutter / 2}px`,
        marginRight: `-${gutter / 2}px`,
      };
    }
  }, [gutter]);

  return (
    <FluxProvider gutter={gutter}>
      <StyledRow
        {...props}
        align={align}
        justify={justify}
        style={{ ...props.style, ...gutterStyle }}
      >
        {children}
      </StyledRow>
    </FluxProvider>
  );
};

export default Row;
