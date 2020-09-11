import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Select from "./index";

const defaultSelect = () => (
  <Select
    placeholder="Select"
    onChange={action("changed")}
    onVisibleChange={action("visible")}
  >
    <Select.Option value="option 1" />
    <Select.Option value="option 2" />
    <Select.Option value="option 3" />
    <Select.Option value="disabled" disabled />
    <Select.Option value="option 5" />
  </Select>
);
const multipleSelect = () => (
  <Select
    placeholder="with multiple select options"
    onChange={action("changed")}
    onVisibleChange={action("visible")}
    multiple
  >
    <Select.Option value="option 1" />
    <Select.Option value="option 2" />
    <Select.Option value="option 3" />
    <Select.Option value="normalized 1" />
    <Select.Option value="normalized 2" />
  </Select>
);

const disabledSelect = () => (
  <Select placeholder="It's disabled" disabled>
    <Select.Option value="option 1" />
    <Select.Option value="option 2" />
    <Select.Option value="option 3" />
  </Select>
);

storiesOf("Select", module)
  .add("Select", defaultSelect)
  .add("Select with multiple select options", multipleSelect)
  .add("Disabled Select", disabledSelect);
