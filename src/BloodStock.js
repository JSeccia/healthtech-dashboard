// BloodStock.js

import { useEffect, useState } from "react";
import './BloodStock.css';  // Import the CSS

// Mock data
const mockData = {
	'Hospital A': { 'A+': 10, 'A-': 15, 'B+': 20, 'B-': 25, 'AB+': 30, 'AB-': 35, 'O+': 40, 'O-': 45 },
	'Hospital B': { 'A+': 15, 'A-': 20, 'B+': 25, 'B-': 30, 'AB+': 35, 'AB-': 40, 'O+': 45, 'O-': 50 },
};

const BloodStock = () => {
	const [data, setData] = useState({});
	const [notifications, setNotifications] = useState([]);
	const lowStockThreshold = 20; // Define your own threshold

	useEffect(() => {
		// Fetch data from API
		// For now, we'll use mock data
		setData(mockData);
	}, []);

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
					// Add a new notification
					newNotifications.push(`Low on ${type} stock in ${hospital}. Recommended transferring ${unitsToTransfer} units from ${otherHospital} to ${hospital}.`);
				}
			});
		});
		setNotifications(newNotifications);
	}, [data]);

	return (
		<div>
			<h2>Notifications ({notifications.length})</h2>
			{notifications.map((notification, index) => (
				<p key={index} className="notification">{notification}</p>
			))}
			{Object.entries(data).map(([hospital, bloodTypes]) => (
				<div key={hospital}>
					<h3>{hospital}</h3>
					<table>
						<thead>
						<tr>
							<th>Blood Type</th>
							<th>Units</th>
						</tr>
						</thead>
						<tbody>
						{Object.entries(bloodTypes).map(([type, count]) => (
							<tr key={type}>
								<td>{type}</td>
								<td>{count}</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
};

export default BloodStock;
