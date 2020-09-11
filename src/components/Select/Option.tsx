import React, { FC, useContext } from "react";
import classNames from "classnames";
import Icon from "../Icon/Icon";
import { SelectContext } from "./Select";
export interface SelectOptionProps {
  index?: string;
  /** Filter based on this attribute value by default, and the value cannot be the same */
  value: string;
  /** The label of the option, if not set, the default is the same as value */
  label?: string;
  /** if disabled */
  disabled?: boolean;
}

export const Option: FC<SelectOptionProps> = ({
  value,
  label,
  disabled,
  children,
  index,
}) => {
  const { onSelect, selectedValues, multiple } = useContext(SelectContext);
  const isSelected = selectedValues.includes(value);
  const classes = classNames("normalized-select-item", {
    "is-disabled": disabled,
    "is-selected": isSelected,
  });
  const handleClick = (
    e: React.MouseEvent,
    value: string,
    isSelected: boolean
  ) => {
    e.preventDefault();
    if (onSelect && !disabled) {
      onSelect(value, isSelected);
    }
  };
  return (
    <li
      key={index}
      className={classes}
      onClick={(e) => {
        handleClick(e, value, isSelected);
      }}
    >
      {children || (label ? label : value)}
      {multiple && isSelected && <Icon icon="check" />}
    </li>
  );
};

Option.displayName = "Option";

export default Option;
