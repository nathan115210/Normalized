import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";

import Menu, { MenuProps } from "./Menu";
import MenuItem from "./MenuItem";

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test-ClassName",
};

const testVerticalProps: MenuProps = {
  defaultIndex: 0,
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>link 3</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuEle: HTMLElement,
  activeEle: HTMLElement,
  disabledEle: HTMLElement;

describe("test menu and MenuItem component", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuEle = wrapper.getByTestId("test-menu");
    activeEle = wrapper.getByText("active");
    disabledEle = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuEle).toBeInTheDocument;
    expect(menuEle).toHaveClass("normalized-menu test-ClassName");
    expect(menuEle.getElementsByTagName("li").length).toEqual(3);
    expect(activeEle).toHaveClass("menu-item is-active");
    expect(disabledEle).toHaveClass("menu-item is-disabled");
  });
  it("clicked menu items should be changed to active and call the right callback", () => {
    const thirdItem = wrapper.getByText("link 3");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeEle).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
  });
  it("disabled menu item should not able to be clicked", () => {
    fireEvent.click(disabledEle);
    expect(disabledEle).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });
  it("should render vertical mode when the mode is set to vertical", () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("normalized-menu--vertical");
  });
  //TODO: add testing for reserved vertical mode (RTL lang)
});
