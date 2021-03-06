import React, {
  FC,
  useState,
  useContext,
  FunctionComponentElement,
} from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { MenuItemProps } from "./MenuItem";
import Icon from "../Icon/Icon";
import Transition, { TransitionProps } from "../Transition/Transition";

export interface SubMenuProps {
  /** SubMenu index */
  index?: string;
  /** SubMenu title */
  title: string;
  /** Customized  classNames*/
  className?: string;
  /** The animation effect of subMenu */
  animation?: TransitionProps["animation"];
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const { index, title, children, className, animation } = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
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
    const subMenuAnimation = animation ? animation : "zoom-in-top";
    return (
      <Transition in={menuOpen} timeout={300} animation={subMenuAnimation}>
        <ul className={subMenuClasses}> {childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
