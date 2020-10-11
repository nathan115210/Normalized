import React, { FC } from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  /** Display different colors according to theme */
  theme?: ThemeProps;
}

/**
 * Provides a set of commonly used icons based on react-fontawesome.
 *
 * Support all attributes of react-fontawesome, you can query here https://github.com/FortAwesome/react-fontawesome#basic
 *
 * Support all free-solid-icons of fontawesome, you can view all icons here https://fontawesome.com/icons?d=gallery&s=solid&m=free
 *
 * ### Usage
 *
 * ~~~js
 * import {Icon} from 'normalizedui'
 * ~~~
 */
export const Icon: FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames("normalized-icon", className, {
    [`icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
