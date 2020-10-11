import { FC } from "react";
import Tabs, { TabsProps } from "./Tabs";
import TabsItem, { TabItemProps } from "./TabItem";

export type TabsComponentProps = FC<TabsProps> & {
  Item: FC<TabItemProps>;
};
const TransTabs = Tabs as TabsComponentProps;
TransTabs.Item = TabsItem;

export default TransTabs;
