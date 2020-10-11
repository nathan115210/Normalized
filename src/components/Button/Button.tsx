import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

export type ButtonType = "primary" | "danger" | "link" | "default";
export type ButtonSize = "lg" | "sm";

interface BaseButtonProps {
  /** can be set to primary ghost dashed link or default */
  btnType?: ButtonType;
  /** add customized className for button */
  size?: ButtonSize;
  /** redirect url of link button */
  className?: string;
  /** disabled state of button */
  disabled?: boolean;
  /** set the size of button */
  href?: string;
  children: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * To trigger an operation, and completing specific interactions.
 * Support all the attributes of HTML button and link
 *
 * ### usage
 *
 * ~~~js
 * import { Button } from 'normalizedui'
 * ~~~
 */

const Button: FC<ButtonProps> = (props) => {
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
