import React, { FC, useState, FunctionComponentElement } from "react";
import classNames from "classnames";
import { TabItemProps } from "./TabItem";

type SelectCallback = (selectedIndex: number) => void;

export interface TabsProps {
  /** current tab's index, default as 0 */
  defaultIndex?: number;
  /** customized style*/
  className?: string;
  /** click Tab triggered callback function */
  onSelect?: SelectCallback;
  /** types of tabs, default as line */
  type?: "line" | "card";
}

/**
 * Tabs make it easy to switch between different views.
 * Provide a level area to store and display large pieces of content to keep the interface tidy.
 * ### USAGE
 *
 * ~~~js
 * import { Tabs } from 'normalizedui'
 * ~~~
 */

export const Tabs: FC<TabsProps> = (props) => {
  const { defaultIndex, className, onSelect, children, type } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const handleClick = (
    e: React.MouseEvent,
    index: number,
    disabled: boolean | undefined
  ) => {
    if (!disabled) {
      setActiveIndex(index);
      if (onSelect) {
        onSelect(index);
      }
    }
  };
  const navClass = classNames("normalized-tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames("normalized-tabs-nav-item", {
        "is-active": activeIndex === index,
        disabled: disabled,
      });
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={(e) => {
            handleClick(e, index, disabled);
          }}
        >
          {label}
        </li>
      );
    });
  };
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child;
      }
    });
  };
  return (
    <div className={`normalized-tabs ${className}`}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="normalized-tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: "line",
};
export default Tabs;
