import React from "react";
import { storiesOf } from "@storybook/react";

import Button from "./Button";

const defaultButton = () => <Button>Default</Button>;
export const buttonEWidthSizes = () => (
  <div>
    <Button size="lg">Large</Button>
    <Button size="sm">Small</Button>
  </div>
);

const buttonWithTypes = () => (
  <div>
    <Button btnType="primary">Primary</Button>
    <Button btnType="danger">Danger</Button>
    <Button btnType="link">Link</Button>
  </div>
);

const buttonWithDisabled = () => (
  <div>
    <Button disabled>Disabled Button</Button>
    <Button btnType="link" href="#" disabled>
      Disabled Link
    </Button>
  </div>
);

storiesOf("Button", module)
  .add("Button", defaultButton)
  .add("Size", buttonEWidthSizes)
  .add("Types", buttonWithTypes)
  .add("Disabled", buttonWithDisabled);
