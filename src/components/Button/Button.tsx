import React from "react";
import classNames from "classnames";

interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  size?: "large" | "small";
  btnType?: "primary" | "danger" | "link" | "default";
  href?: string;
}

type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    disabled,
    size,
    btnType,
    href,
    ...restProps
  } = props;
  const classes = classNames(
    "btn",
    `btn-${btnType}`,
    {
      [`btn-${size}`]: size,
      [`btn-disabled`]: btnType === "link" && disabled,
    },
    className
  );
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
