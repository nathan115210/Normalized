import React from "react";
import { storiesOf } from "@storybook/react";

import Button from "./Button";

const defaultButton = () => <Button>Default</Button>;
export const buttonEWidthSizes = () => (
  <>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button>
  </>
);

const buttonWithTypes = () => (
  <>
    <Button btnType="primary">Primary</Button>
    <Button btnType="danger">Danger</Button>
    <Button btnType="link">Link</Button>
  </>
);

const buttonWithDisabled = () => (
  <>
    <Button disabled>Disabled Button</Button>
    <Button btnType="link" href="#" disabled>
      Disabled Link
    </Button>
  </>
);

storiesOf("Button", module)
  .add("Button", defaultButton)
  .add("Size", buttonEWidthSizes)
  .add("Types", buttonWithTypes)
  .add("Disabled", buttonWithDisabled);
