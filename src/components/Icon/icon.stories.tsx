import React from "react";
import { storiesOf } from "@storybook/react";
import Icon from "./Icon";
import Button from "../Button/Button";

const defaultIcons = () => (
  <div>
    <Icon icon="check" size="3x" />
    <Icon icon="times" size="3x" />
    <Icon icon="anchor" size="3x" />
    <Icon icon="trash" size="3x" />
    <Button size="lg" btnType="primary">
      <Icon icon="check" /> check{" "}
    </Button>
  </div>
);

const themeIcons = () => (
  <div>
    <Icon icon="check" size="3x" theme="success" />
    <Icon icon="times" size="3x" theme="danger" />
    <Icon icon="anchor" size="3x" theme="primary" />
    <Icon icon="exclamation-circle" size="3x" theme="warning" />
  </div>
);

const customIcons = () => (
  <div>
    <Icon icon="spinner" size="3x" theme="primary" spin />
    <Icon icon="spinner" size="3x" theme="success" pulse />
  </div>
);

storiesOf("Icon", module)
  .add("Icon", defaultIcons)
  .add("Icon with different theme", themeIcons)
  .add("More icons", customIcons, {
    info: {
      text:
        "More examples：https://github.com/FortAwesome/react-fontawesome#basic",
    },
  });
