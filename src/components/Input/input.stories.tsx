import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input from "./Input";
const ControlledInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
const defaultInput = () => (
  <>
    <p>Default input</p>
    <Input
      style={{ width: "300px" }}
      placeholder="placeholder"
      onChange={action("changed")}
    />
    <p>Controlled input</p>
    <ControlledInput />
  </>
);
const disabledInput = () => (
  <>
    <p>Disabled input</p>
    <Input style={{ width: "300px" }} placeholder="disabled input" disabled />
  </>
);

const iconInput = () => (
  <>
    <p>Input with icon</p>
    <Input
      style={{ width: "300px" }}
      placeholder="input with icon"
      icon="search"
    />
  </>
);

const sizeInput = () => (
  <>
    <p>Large input</p>
    <Input style={{ width: "300px" }} defaultValue="large size" size="lg" />
    <p>Small input</p>
    <Input style={{ width: "300px" }} placeholder="small size" size="sm" />
  </>
);

const pendInput = () => (
  <>
    <p>Prepend Input</p>
    <Input
      style={{ width: "300px" }}
      defaultValue="prepend text"
      prepend="https://"
    />
    <p>Append Input</p>
    <Input style={{ width: "300px" }} defaultValue="google" append=".com" />
  </>
);

storiesOf("Input component", module)
  .add("Input", defaultInput)
  .add("Disabled Input", disabledInput)
  .add("Input with icon", iconInput)
  .add("Different sizes Input", sizeInput)
  .add("Input with append or prepend", pendInput);
