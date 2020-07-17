import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./components/Menu/SubMenu";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
library.add(fas);

function App() {
  const element = (
    <Menu>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>link 3</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop 1</MenuItem>
        <MenuItem>drop 1</MenuItem>
        <MenuItem>drop 1</MenuItem>
        <MenuItem>drop 1</MenuItem>
        <MenuItem>drop 1</MenuItem>
      </SubMenu>
    </Menu>
  );
  return <div className="App">{element}</div>;
}

export default App;
