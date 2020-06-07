import React from "react";
import Tabs from "../src/components/Tabs/Tabs";
import TabItem from "../src/components/Tabs/TabItem";
function App() {
  return (
    <div className="App">
      <Tabs type="card">
        <TabItem label="tab1">content1</TabItem>
        <TabItem label="tab2">content2</TabItem>
        <TabItem label="disabled" disabled>
          content3
        </TabItem>
      </Tabs>
    </div>
  );
}

export default App;
