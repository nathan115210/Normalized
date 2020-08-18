import React, { FC, useState, ChangeEvent, ReactElement } from "react";
import Input, { InputProps } from "../Input/Input";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: string) => {
    setInputValue(item);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((suggestion, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                handleSelect(suggestion);
              }}
            ></li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="normalized-auto-complete">
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && generateDropDown()}
    </div>
  );
};

export default AutoComplete;
