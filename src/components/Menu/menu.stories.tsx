import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Menu from "./index";

export const defaultMenu = () => (
  <Menu defaultIndex="0" onSelect={action("selected!")}>
    <Menu.Item>cool link</Menu.Item>
    <Menu.Item>cool link 2</Menu.Item>
    <Menu.Item disabled>disabled</Menu.Item>
    <Menu.SubMenu title="Sub Menu">
      <Menu.Item>Menu item 1</Menu.Item>
      <Menu.Item>Menu item 2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);
export const verticalMenu = () => (
  <Menu
    defaultIndex="0"
    onSelect={action("selected!")}
    mode="vertical"
    defaultOpenSubMenus={["2"]}
  >
    <Menu.Item>cool link</Menu.Item>
    <Menu.Item>cool link 2</Menu.Item>
    <Menu.SubMenu title="Open subMenu as default">
      <Menu.Item>Menu item 1</Menu.Item>
      <Menu.Item>Menu item 2</Menu.Item>
    </Menu.SubMenu>
    <Menu.SubMenu title="Click open subMenu">
      <Menu.Item>Menu item 1</Menu.Item>
      <Menu.Item>Menu item 2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);
export const openedMenu = () => (
  <Menu defaultIndex="0" onSelect={action("selected!")} mode="horizontal">
    <Menu.Item>cool link</Menu.Item>
    <Menu.Item>cool link 2</Menu.Item>
    <Menu.SubMenu title="Hover-on open subMenu">
      <Menu.Item>Menu item 1</Menu.Item>
      <Menu.Item>Menu item 2</Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

storiesOf("Menu", module)
  .add("Menu", defaultMenu)
  .add("Vertical Menu", verticalMenu)
  .add("Horizontal Menu", openedMenu);
