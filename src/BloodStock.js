// BloodStock.js

import { useEffect, useState } from "react";
import './BloodStock.css';  // Import the CSS

// Mock data
const mockData = {
	'Hospital A': { 'A+': 10, 'A-': 15, 'B+': 20, 'B-': 25, 'AB+': 30, 'AB-': 35, 'O+': 40, 'O-': 15 },
	'Hospital B': { 'A+': 15, 'A-': 20, 'B+': 25, 'B-': 30, 'AB+': 35, 'AB-': 40, 'O+': 45, 'O-': 50 },
};

const BloodStock = ({ data, setData, lowStockThreshold }) => {

	useEffect(() => {
		// Fetch data from API
		// For now, we'll use mock data
		setData(mockData);
	}, []);

	return (
		<div className="container">
			{Object.entries(data).map(([hospital, bloodTypes]) => (
				<div key={hospital} className="hospital">
					<h3>{hospital}</h3>
					<table>
						<thead>
						<tr>
							<th>Blood Type</th>
							<th>Units</th>
							<th>Stock OK</th>
						</tr>
						</thead>
						<tbody>
						{Object.entries(bloodTypes).map(([type, count]) => (
							<tr key={type}>
								<td>{type}</td>
								<td>{count}</td>
								<td>{count > lowStockThreshold ? '✔️' : '❌'}</td>
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
