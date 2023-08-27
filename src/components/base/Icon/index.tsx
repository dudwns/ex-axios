import styled from "@emotion/styled";
import feather, { FeatherIconNames } from "feather-icons";

const IconWrapper = styled.i`
  display: inline-block;
`;

interface IconProps {
  name: FeatherIconNames;
  size?: number;
  strokeWidth?: number;
  rotate?: number;
  color?: string;
}

const Icon = ({
  name,
  size = 16,
  strokeWidth = 2,
  rotate,
  color = "#222",
  ...props
}: IconProps) => {
  const shapeStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };
  const iconStyle = {
    "stroke-width": strokeWidth,
    stroke: color,
    width: size,
    height: size,
  };

  const icon = feather.icons[name]; // icon을 불러옴
  const svg = icon ? icon.toSvg(iconStyle) : ""; // icon이 존재하면 svg를 불러옴 (스타일 전달)
  const base64 = btoa(svg); // 이미지 태그 이용시 base64로 인코딩
  return (
    <IconWrapper {...props} style={shapeStyle}>
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </IconWrapper>
  );
};

export default Icon;
