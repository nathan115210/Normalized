import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input from "./Input";

const defaultInput = () => (
  <Input placeholder="Default input" onChange={action("changed")} />
);
const disabledInput = () => (
  <Input style={{ width: "300px" }} placeholder="disabled input" disabled />
);

const iconInput = () => <Input placeholder="input with icon" icon="search" />;

const sizeInput = () => (
  <div>
    <Input style={{ width: "300px" }} placeholder="large size" size="lg" />
    <Input style={{ width: "300px" }} placeholder="small size" size="sm" />
  </div>
);

const pendInput = () => (
  <div>
    <Input
      style={{ width: "300px" }}
      placeholder="prepend text"
      prepend="https://"
    />
    <Input style={{ width: "300px" }} placeholder="google" append=".com" />
  </div>
);

storiesOf("Input component", module)
  .add("Input", defaultInput)
  .add("Disabled Input", disabledInput)
  .add("Input with icon", iconInput)
  .add("Different sizes Input", sizeInput)
  .add("Input with append or prepend", pendInput);
