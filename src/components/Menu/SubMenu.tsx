import React, {
  FC,
  useState,
  useContext,
  FunctionComponentElement,
} from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { MenuItemProps } from "./MenuItem";

export interface SubMenuProps {
  /** SubMenu index */
  index?: string;
  /** SubMenu title */
  title: string;
  /** Customized  classNames*/
  className?: string;
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, children, className } = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvents =
    context.mode === "vertical" ? { onClick: handleClick } : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames("normalized-submenu", {
      "submenu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childEle = child as FunctionComponentElement<MenuItemProps>;
      if (childEle.type.displayName === "MenuItem") {
        return React.cloneElement(childEle, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          '"Warning: Sun menu has a child which is not the menuItem component"'
        );
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
