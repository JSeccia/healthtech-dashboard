import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// Mock data
const mockData = {
  'Hospital A': { 'A+': 10, 'A-': 15, 'B+': 20, 'B-': 25, 'AB+': 30, 'AB-': 35, 'O+': 40, 'O-': 45 },
  'Hospital B': { 'A+': 15, 'A-': 20, 'B+': 25, 'B-': 30, 'AB+': 35, 'AB-': 40, 'O+': 45, 'O-': 50 },
};

const BloodStock = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch data from API
    // For now, we'll use mock data
    setData(mockData);
  }, []);

  return (
    <div>
      {Object.entries(data).map(([hospital, bloodTypes]) => (
        <div key={hospital}>
          <h3>{hospital}</h3>
          {Object.entries(bloodTypes).map(([type, count]) => (
            <p key={type}>
              {type}: {count}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <Tabs>
      <TabList>
        <Tab>Blood Stock</Tab>
        <Tab>Other Information</Tab>
      </TabList>

      <TabPanel>
        <BloodStock />
      </TabPanel>
      <TabPanel>
        <h2>Other content</h2>
      </TabPanel>
    </Tabs>
  );
}

export default App;
