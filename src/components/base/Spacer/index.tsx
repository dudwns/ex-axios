import React from "react";

interface SpacerProps {
  children?: React.ReactNode;
  type?: string;
  size?: number;
  style?: React.CSSProperties;
}

const Spacer = ({ children, type = "horizontal", size = 8, ...props }: SpacerProps) => {
  const spacerStyle = {
    ...props.style,
    display: type === "vertical" ? "block" : "inline-block",
    verticalAlign: type === "horizontal" ? "middle" : undefined,
  };

  const nodes = React.Children.toArray(children)
    .filter((element): element is React.ReactElement => React.isValidElement(element)) // 자식 요소들 중 유효한 React 요소인지 검사, 유효한 요소만 남겨둠
    // 남은 유효한 자식 요소들을 순회
    .map((element, index, elements) => {
      // 주어진 React 요소를 복제하면서 새로운 속성을 추가 또는 기존 속성을 수정할 수 있게 해줌
      return React.cloneElement(element, {
        // 속성을 추가
        ...element.props,
        style: {
          ...element.props.style,
          marginRight: type === "horizontal" && index !== elements.length - 1 ? size : undefined,
          marginBottom: type === "vertical" && index !== elements.length - 1 ? size : undefined,
        },
      });
    });

  return (
    <div {...props} style={spacerStyle}>
      {nodes}
    </div>
  );
};

export default Spacer;
