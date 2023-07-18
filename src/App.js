// App.js

import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BloodStock from "./BloodStock";
import Notifications from "./Notifications";
import './App.css';
import SensorMonitor from "./SensorMonitor";  // Import the CSS

function App() {
	const [history, setHistory] = useState([]);
	const [notifications, setNotifications] = useState([]);
	const [data, setData] = useState({});
	const lowStockThreshold = 20; // Define your own threshold

	useEffect(() => {
		const newNotifications = [];
		Object.entries(data).forEach(([hospital, bloodTypes]) => {
			Object.entries(bloodTypes).forEach(([type, count]) => {
				if (count < lowStockThreshold) {
					// Find the other hospital
					const otherHospital = Object.keys(data).find(h => h !== hospital);
					// Find the stock of the same blood type in the other hospital
					const otherHospitalStock = data[otherHospital][type];
					// Calculate the number of units to transfer
					const unitsToTransfer = Math.min((lowStockThreshold - count), otherHospitalStock);
					// Check if the transfer would put the other hospital below the threshold
					if (otherHospitalStock - unitsToTransfer < lowStockThreshold) {
						// If it would, recommend ordering units from the blood bank
						newNotifications.push(`Low on ${type} stock in ${hospital}. Recommended ordering ${unitsToTransfer} units from the blood bank.`);
					} else {
						// If it wouldn't, recommend transferring units from the other hospital
						newNotifications.push(`Low on ${type} stock in ${hospital}. Recommended transferring ${unitsToTransfer} units from ${otherHospital} to ${hospital}.`);
					}
				}
			});
		});
		setNotifications(newNotifications);
	}, [data, setNotifications, lowStockThreshold]);


	return (
		<Tabs>
			<TabList className="tabs">
				<Tab>Blood Stock</Tab>
				<Tab>Notifications ({notifications.length})</Tab>
				<Tab>Sensor Monitor</Tab>
			</TabList>

			<TabPanel className="tab-content">
				<BloodStock
					setNotifications={setNotifications}
					data={data} setData={setData}
					lowStockThreshold={lowStockThreshold}/>
			</TabPanel>
			<TabPanel className="tab-content">
				<Notifications
					notifications={notifications} setNotifications={setNotifications} history={history} setHistory={setHistory}/>
			</TabPanel>
			<TabPanel className="tab-content">
				<SensorMonitor/>
			</TabPanel>
		</Tabs>
	);
}

export default App;
