import styled from "@emotion/styled";
import React from "react";
import BreadcrumbItem, { BreadcrumbItemProps } from "./BreadcrumbItem";

const BreadcrumbContainer = styled.nav`
  display: inline-block;
`;

interface BreadcrumbProps {
  children: React.ReactNode;
}

const Breadcrumb = ({ children, ...props }: BreadcrumbProps) => {
  const items = React.Children.toArray(children)
    .filter((element): element is React.ReactElement<BreadcrumbItemProps> => {
      if (React.isValidElement(element) && element.props.__TYPE === "BreadcrumbItem") {
        return true;
      }

      console.warn("Only accepts Breadcrumb. Item as it's children.");
      return false;
    })
    .map((element, index, elements) => {
      return React.cloneElement(element, {
        ...element.props,
        active: index === elements.length - 1,
      });
    });

  return <BreadcrumbContainer {...props}>{items}</BreadcrumbContainer>;
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
