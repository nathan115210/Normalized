import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Alert from "./Alert";

const defaultAlert = () => {
  return <Alert title="This is alert!"></Alert>;
};

const stylesAlert = () => {
  return (
    <div>
      <Alert title="This is Default alert!"></Alert>
      <Alert title="This is Success alert!" type="success"></Alert>
      <Alert title="This is Danger alert!" type="danger"></Alert>
      <Alert title="This is Warning alert!" type="warning"></Alert>
    </div>
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
const iconAlert = () => {
  return (
    <div>
      <Alert title="Alert shows icon with title only" showIcon></Alert>
      <Alert
        title="Alert shows icon with description"
        description="Lorem ipsum dolor sit amet, ante ut rhoncus adipiscing nunc, consequat non sit semper, iusto justo tincidunt at id varius"
        showIcon
      ></Alert>
      <h4>Default icon in different alert types</h4>
      <Alert title="This is default alert with icon!" showIcon></Alert>
      <Alert
        title="This is success alert with icon!"
        type="success"
        showIcon
      ></Alert>
      <Alert title="This is warning with icon!" type="warning" showIcon></Alert>
      <Alert title="This is Danger with icon!" type="danger" showIcon></Alert>
    </div>
  );
};
const closableAlert = () => {
  return (
    <div>
      <Alert title="This is alert with closable"></Alert>
      <Alert title="This is alert without closable" closable={false}></Alert>
    </div>
  );
};

storiesOf("Alert", module)
  .add("Alert", defaultAlert)
  .add("Alert with different types", stylesAlert)
  .add("Alert with description", descAlert)
  .add("Alert with additional icon", iconAlert)
  .add("Alert with closable", closableAlert);
