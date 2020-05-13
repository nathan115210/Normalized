import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "welcome",
  () => {
    return (
      <>
        <h2>Welcome to normalized component library</h2>
        <p>
          normalized component library is made for react with using React hook
        </p>
        <h3>Install</h3>
        <code>npm install normalized --save</code>
      </>
    );
  },
  { info: { disable: true } }
);
