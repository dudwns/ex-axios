import styled from "@emotion/styled";
import React, { useMemo, useState } from "react";
import TabItem, { TabItemProps } from "./TabItem";

const TabItemcontainer = styled.div`
  border-bottom: 2px solid #ddd;
  background-color: #eee;
`;

interface TabProps {
  children: React.ReactNode;
  active?: boolean;
}

const childrenToArray = (children: React.ReactNode, types: string) => {
  return React.Children.toArray(children).filter(
    (element): element is React.ReactElement<TabItemProps> => {
      if (React.isValidElement(element) && types.includes(element.props.__TYPE)) {
        return true;
      }

      console.warn(
        `Only accepts ${Array.isArray(types) ? types.join(", ") : types} as it's children.`
      );
      return false;
    }
  );
};

const Tab = ({ children, active, ...props }: TabProps) => {
  // 현재 Tab의 초깃값을 active가 있으면 active, active가 없으면 자식 노드 중 첫 Tab-Item을 지정
  const [currentActive, setCurrentActive] = useState(() => {
    if (active) {
      return active;
    } else {
      const index = childrenToArray(children, "Tab.Item")[0].props.index;
      return index;
    }
  });

  const items = useMemo(() => {
    return childrenToArray(children, "Tab.Item").map((element) => {
      return React.cloneElement(element, {
        ...element.props,
        key: element.props.index,
        active: element.props.index === currentActive,
        onClick: () => {
          setCurrentActive(element.props.index);
        },
      });
    });
  }, [children, currentActive]);

  const activeItem = useMemo(
    () => items.find((element) => currentActive === element.props.index),
    [currentActive, items]
  );
  return (
    <div>
      <TabItemcontainer {...props}>{items}</TabItemcontainer>
      <div>{activeItem?.props.children}</div>
    </div>
  );
};

Tab.Item = TabItem;

export default Tab;
