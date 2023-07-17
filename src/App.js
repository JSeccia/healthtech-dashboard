// App.js

import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BloodStock from "./BloodStock";
import './App.css';  // Import the CSS

function App() {
  return (
    <Tabs>
      <TabList className="tabs">
        <Tab>Blood Stock</Tab>
        <Tab>Other Information</Tab>
      </TabList>

      <TabPanel className="tab-content">
        <BloodStock />
      </TabPanel>
      <TabPanel className="tab-content">
        <h2>Other content</h2>
      </TabPanel>
    </Tabs>
  );
}

export default App;
