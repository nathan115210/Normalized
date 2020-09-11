import { FC } from "react";

import Select, { SelectProps } from "./Select";
import Option, { SelectOptionProps } from "./Option";

export type ISelectComponent = FC<SelectProps> & {
  Option: FC<SelectOptionProps>;
};

const TransSelect = Select as ISelectComponent;
TransSelect.Option = Option;

export default TransSelect;
