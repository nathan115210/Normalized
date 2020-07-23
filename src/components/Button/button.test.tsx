import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./Button";
import "@testing-library/jest-dom/extend-expect";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "testClassName",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test Button component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Button</Button>);
    const element = wrapper.getByText("Button") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
    expect(element.disabled).toBeFalsy();
  });
  it("should render the correct component based on the different props", () => {
    const wrapper = render(<Button {...testProps}>Button</Button>);
    const element = wrapper.getByText("Button");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-large testClassName");
  });
  it("should render a link when the btnType is link and href is provided", () => {
    const wrapper = render(
      <Button btnType="link" href="http://dummyurl">
        Link
      </Button>
    );
    const element = wrapper.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });
  it("should render disabled button when the prop disabled set as true", () => {
    const wrapper = render(<Button {...disabledProps}>Disabled Button</Button>);
    const element = wrapper.getByText("Disabled Button") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
