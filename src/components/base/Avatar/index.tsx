import styled from "@emotion/styled";
import { CSSProperties, useEffect, useState } from "react";
import ImageComponent from "../Image";
import AvatarGroup from "./AvatarGroup";
import PropTypes from "prop-types";

const ShapeToCssValue = {
  circle: "50%",
  round: "4px",
  square: "0px",
};

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  background-color: #eee;
  overflow: hidden;

  > img {
    transition: opacity 0.2s ease-out;
  }
`;

interface AvatarWrapperProps {
  shape: "circle" | "round" | "square";
}

export interface AvatarProps {
  lazy?: boolean;
  threshold?: number;
  src: string;
  size?: number;
  shape?: "circle" | "round" | "square";
  placeholder?: string;
  alt?: string;
  mode?: "cover" | "fill" | "contain";
  style?: CSSProperties;
  __TYPE: string;
}

const Avatar = ({
  lazy,
  threshold,
  src,
  size = 70,
  shape = "circle",
  placeholder,
  alt,
  mode = "cover",
  ...props
}: AvatarProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, [src]);

  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        styleprop={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
};

Avatar.defaultProps = {
  __TYPE: "Avatar",
}; // Avatar 타입이 들어왔는지 확인하기 위해 defaultProps로 따로 지정한다.

Avatar.propTypes = {
  __TYPE: PropTypes.oneOf(["Avatar"]),
}; // prop을 다른 것으로 변경하지 못하게 경고

Avatar.Group = AvatarGroup;

export default Avatar;
