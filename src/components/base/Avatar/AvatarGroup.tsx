import React, { CSSProperties } from "react";
import { AvatarProps } from ".";

interface AvatarGroupProps {
  children: React.ReactNode;
  shape?: "circle" | "round" | "square";
  size?: number;
  style?: CSSProperties;
}

const AvatarGroup = ({ children, shape = "circle", size = 70, ...props }: AvatarGroupProps) => {
  const avatars = React.Children.toArray(children)
    .filter((element): element is React.ReactElement<AvatarProps> => {
      if (React.isValidElement(element) && element.props.__TYPE === "Avatar") {
        return true;
      }

      console.warn("Only accepts Avatar as it's children.");
      return false;
    })
    .map((avatar, index, avatars) => {
      return React.cloneElement(avatar, {
        ...avatar.props,
        size,
        shape,
        style: {
          ...avatar.props.style,
          marginLeft: -size / 5,
          zIndex: avatars.length - index,
        },
      });
    });

  return (
    <div style={{ paddingLeft: size / 5 }} {...props}>
      {avatars}
    </div>
  );
};

export default AvatarGroup;
