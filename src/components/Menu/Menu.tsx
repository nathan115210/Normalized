import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./MenuItem";

type MenuMode = "horizontal" | "vertical";

type SelectCallback = (selectIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
  mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("normalized-menu", className, {
    "normalized-menu--vertical": mode === "vertical",
    "normalized-menu--horizontal": mode !== "vertical",
  });

  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
    mode: mode,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childEle = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childEle.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childEle, {
          index,
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not the menuItem component"
        );
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
