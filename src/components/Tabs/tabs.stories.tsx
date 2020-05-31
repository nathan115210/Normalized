import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Tabs from "./Tabs";
import TabItem from "./TabItem";
const defaultTabs = () => (
  <Tabs onSelect={action("selected")}>
    <TabItem label="option 1">this is content one</TabItem>
    <TabItem label="option 2">this is content two</TabItem>
    <TabItem label="admin">this is content three</TabItem>
  </Tabs>
);

const cardTabs = () => (
  <Tabs onSelect={action("selected")} type="card">
    <TabItem label="card1">this is card one</TabItem>
    <TabItem label="card2">this is content two</TabItem>
    <TabItem label="disabled" disabled>
      this is content three
    </TabItem>
  </Tabs>
);

// TODO: add customized tab style  story after Icon component is done

storiesOf("Tabs", module)
  .add("Tabs", defaultTabs)
  .add("Card type Tabs", cardTabs);
//   .add("customized tab style", customTabs);
