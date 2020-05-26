import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from "@testing-library/react";

import Menu, { MenuProps } from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test-ClassName",
};

const testVerticalProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>link 3</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop 1</MenuItem>
      </SubMenu>
      <SubMenu title="opened" openAsDefault>
        <MenuItem>opened 1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .normalized-submenu{
      display: none;
    }
    .normalized-submenu.submenu-opened {
      display: block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuEle: HTMLElement,
  activeEle: HTMLElement,
  disabledEle: HTMLElement;

describe("test menu, subMenu and MenuItem components in default(horizontal) mode", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuEle = wrapper.getByTestId("test-menu");
    activeEle = wrapper.getByText("active");
    disabledEle = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuEle).toBeInTheDocument;
    expect(menuEle).toHaveClass("normalized-menu test-ClassName");
    expect(menuEle.querySelectorAll(":scope > li").length).toEqual(5);
    expect(activeEle).toHaveClass("menu-item is-active");
    expect(disabledEle).toHaveClass("menu-item is-disabled");
  });
  it("should show dropdown items when hover on subMenu", async () => {
    expect(wrapper.queryByText("drop 1")).not.toBeVisible();
    const dropdownElement = wrapper.getByText("dropdown");
    fireEvent.mouseEnter(dropdownElement);
    await wait(
      () => {
        expect(wrapper.queryByText("drop 1")).toBeVisible();
      },
      { timeout: 300 }
    );
    fireEvent.click(wrapper.getByText("drop 1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
    fireEvent.mouseLeave(dropdownElement);
    await wait(
      () => {
        expect(wrapper.queryByText("drop 1")).not.toBeVisible();
      },
      { timeout: 300 }
    );
  });
  it("clicked menu items should be changed to active and call the right callback", () => {
    const thirdItem = wrapper.getByText("link 3");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeEle).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
  });
  it("disabled menu item should not able to be clicked", () => {
    fireEvent.click(disabledEle);
    expect(disabledEle).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should render vertical mode when the mode is set to vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("normalized-menu--vertical");
  });
  //TODO: add testing for reserved vertical mode (RTL lang)
});

describe("test Menu and MenuItem components in vertical mode", () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerticalProps));
    wrapper2.container.append(createStyleFile());
  });
  it("should render vertical menu when its mode set to vertical", () => {
    const menuItem = wrapper2.getByTestId("test-menu");
    expect(menuItem).toHaveClass("normalized-menu--vertical");
  });
  it("should show dropdown items when click on the subMenu in vertical mode", () => {
    const dropdownEle = wrapper2.queryByText("drop 1");
    expect(dropdownEle).not.toBeVisible();
    fireEvent.click(wrapper2.getByText("dropdown"));
    expect(dropdownEle).toBeVisible();
  });
  it("should show subMenu dropdown when openAsDefault set as true otherwise not", () => {
    expect(wrapper2.queryByText("opened 1")).toBeVisible();
    expect(wrapper2.queryByText("drop 1")).not.toBeVisible();
  });
});
