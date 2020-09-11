import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./components/Menu/SubMenu";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import Button from "./components/Button/Button";
import Transition from "./components/Transition/Transition";
import Select from "./components/Select/Select";
library.add(fas);

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  console.log("show", show);

  const menu = (
    <>
      <Menu>
        <MenuItem>active</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem>link 3</MenuItem>
        <SubMenu title="dropdown" animation="zoom-in-bottom">
          <MenuItem>drop 1</MenuItem>
          <MenuItem>drop 1</MenuItem>
          <MenuItem>drop 1</MenuItem>
          <MenuItem>drop 1</MenuItem>
          <MenuItem>drop 1</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
  const button = (
    <>
      <Button size="lg" onClick={() => setShow(!show)}>
        big
      </Button>
      <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
        <Button btnType="danger" size="lg" onClick={() => setShow(!show)}>
          big
        </Button>
      </Transition>
    </>
  );
  return (
    <div className="App">
      {menu}
      {button}
    </div>
  );
};

export default App;
