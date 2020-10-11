import React, {
  FC,
  useState,
  createContext,
  useRef,
  FunctionComponentElement,
  useEffect,
} from "react";
import classNames from "classnames";
import Input from "../Input/Input";
import Icon from "../Icon/Icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/Transition";
import { SelectOptionProps } from "./Option";

export interface SelectProps {
  /** Specify the item selected by default, which can be a string or an array of strings */
  defaultValue?: string | string[];
  /** Select box default text */
  placeholder?: string;
  /** if disabled */
  disabled?: boolean;
  /** support multiple selections */
  multiple?: boolean;
  /** select input name attribute */
  name?: string;
  /** Triggered when the selected value changes */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /** Triggered when the drop-down box appears/hides */
  onVisibleChange?: (visible: boolean) => void;
}

export interface ISelectContext {
  onSelect?: (value: string, isSelected?: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}

export const SelectContext = createContext<ISelectContext>({
  selectedValues: [],
});
/**
 * Drop down selector.
 * A drop-down menu pops up for the user to select and operate, which is used to replace the native selector or when a more elegant multiple selector is needed.
 * ### usage
 *
 * ~~~js
 * import { Select } from 'normalizedui'
 * ~~~
 */
const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder,
    children,
    multiple,
    name,
    disabled,
    onChange,
    onVisibleChange,
  } = props;
  const input = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLInputElement>(null);
  const containerWidth = useRef(0);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  );
  const [menuOpen, setOpen] = useState(false);
  const [value, setValue] = useState(
    typeof defaultValue === "string" ? defaultValue : ""
  );
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    // update value
    if (!multiple) {
      setOpen(false);
      setValue(value);
      if (onVisibleChange) {
        onVisibleChange(false);
      }
    } else {
      setValue("");
    }
    let updatedValues = [value];
    // click again to remove selected when is multiple mode
    if (multiple) {
      updatedValues = isSelected
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(updatedValues);
    }
    if (onChange) {
      onChange(value, updatedValues);
    }
  };
  useEffect(() => {
    // focus input
    if (input.current) {
      input.current.focus();
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = "";
      } else {
        if (placeholder) input.current.placeholder = placeholder;
      }
    }
  }, [selectedValues, multiple, placeholder]);
  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width;
    }
  });
  useClickOutside(containerRef, () => {
    setOpen(false);
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false);
    }
  });
  const passedContext: ISelectContext = {
    onSelect: handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setOpen(!menuOpen);
      if (onVisibleChange) {
        onVisibleChange(!menuOpen);
      }
    }
  };
  const generateOptions = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<SelectOptionProps>;
      if (childElement.type.displayName === "Option") {
        return React.cloneElement(childElement, {
          index: `select-${i}`,
        });
      } else {
        console.error(
          "Warning: Select has a child which is not a Option component"
        );
      }
    });
  };
  const containerClass = classNames("normalized-select", {
    "menu-is-open": menuOpen,
    "is-disabled": disabled,
    "is-multiple": multiple,
  });
  return (
    <div className={containerClass} ref={containerRef}>
      <div className="normalized-select-input" onClick={handleClick}>
        <Input
          ref={input}
          placeholder={placeholder}
          value={value}
          readOnly
          icon="angle-down"
          disabled={disabled}
          name={name}
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="normalized-select-dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>
      {multiple && (
        <div
          className="normalized-selected-tags"
          style={{ maxWidth: containerWidth.current - 32 }}
        >
          {selectedValues.map((value, index) => {
            return (
              <span className="normalized-tag" key={`tag-${index}`}>
                {value}
                <Icon
                  icon="times"
                  onClick={() => {
                    handleOptionClick(value, true);
                  }}
                />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
Select.defaultProps = {
  name: "normalized-select",
  placeholder: "select",
};
export default Select;
