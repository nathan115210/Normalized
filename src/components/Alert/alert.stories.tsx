import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Alert from "./Alert";

const defaultAlert = () => {
  return <Alert title="this is alert!"></Alert>;
};

const stylesAlert = () => {
  return (
    <>
      <Alert title="this is Success" type="success"></Alert>
      <Alert title="this is Danger!" type="danger"></Alert>
      <Alert title="this is Warning!" type="warning" closable={false}></Alert>
    </>
  );
};
const descAlert = () => {
  return (
    <Alert
      title="Alert title"
      description="this is a long description"
      onClose={action("closed")}
    ></Alert>
  );
};

storiesOf("Alert", module)
  .add("Alert", defaultAlert)
  .add("Different Alert", stylesAlert)
  .add("Add description Alert", descAlert);
