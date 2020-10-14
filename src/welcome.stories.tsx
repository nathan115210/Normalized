import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "welcome",
  () => {
    return (
      <>
        <h1>Welcome to normalized component library</h1>
        <h4>
          normalized UI component library is made for react with using React
          hook
        </h4>
        <br />
        <br />
        <h3>Installation</h3>
        <code>npm install normalizedui --save</code>
        <br />
        <br />
        <h3>Add styles manually</h3>
        <code>import 'normalizedui/dist/index.css'</code>
      </>
    );
  },
  { info: { disable: true } }
);
