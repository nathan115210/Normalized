import React, {
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
  forwardRef,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/Icon";

type InputSize = "lg" | "sm";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /** Whether the input is disabled */
  disabled?: boolean;
  /**Set the input size */
  size?: InputSize;
  /** Add an icon, add an icon floating on the right side for prompt */
  icon?: IconProp;
  /** Add prepend to configure some fixed combinations */
  prepend?: string | ReactElement;
  /** Add append to configure some fixed combinations */
  append?: string | ReactElement;
  /** */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A basic widget for getting the user input is a text field. Keyboard and mouse can be used for providing or changing data.
 *
 * ~~~js
 * // Usage
 * import { Input } from 'normalized'
 * ~~~
 * Support all HTMLInput attributes
 */

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const cNames = classNames("normalized-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group--prepend": !!prepend,
    "input-group--append": !!append,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={cNames} style={style}>
      {prepend && (
        <div className="normalized-input-group--prepend">{prepend}</div>
      )}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        ref={ref}
        className="normalized-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="normalized-input-group--append">{append}</div>}
    </div>
  );
});

export default Input;
