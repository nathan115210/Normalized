import React, { Fragment } from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import "../src/styles/index.scss";
import "./fix_info_style.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "../src/styles/index.scss";

library.add(fas);

const wrapperStyle: React.CSSProperties = {
  padding: "20px 40px",
};

addDecorator(withInfo);
addParameters({
  info: {
    inline: true,
    header: false,
    // propTablesExclude: [Fragment],
  },
});

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>Component sample</h3>
    {stroyFn()}
  </div>
);
addDecorator(storyWrapper);

const loaderFn = () => {
  const allExports = [require("../src/welcome.stories.tsx")];
  const req = require.context("../src/components", true, /\.stories\.tsx$/);
  req.keys().forEach((fname) => allExports.push(req(fname)));
  return allExports;
};

// automatically import all files ending in *.stories.js
configure(loaderFn, module);
