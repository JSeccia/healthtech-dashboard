// SensorMonitor.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faTachometerAlt, faWind, faSmog } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from "react";
import './SensorMonitor.css';  // Import the CSS

// Mock data
const mockData = [
	{ location: 'OR 1', type: 'Humidity', reading: '45' },
	{ location: 'OR 1', type: 'Pressure', reading: '999 hPa' },
	{ location: 'OR 1', type: 'Pressure', reading: '1001 hPa' },
	{ location: 'OR 1', type: 'Air Quality', reading: 'Good' },
	{ location: 'OR 2', type: 'Humidity', reading: '70' },  // Above normal range
	{ location: 'OR 2', type: 'Pressure', reading: '1012 hPa' },
	{ location: 'OR 2', type: 'Pressure', reading: '1012 hPa' },
	{ location: 'OR 2', type: 'Air Quality', reading: 'Bad' },  // Bad air quality
	// Patient rooms
	{ location: 'Patient Room 1', type: 'Humidity', reading: '50' },
	{ location: 'Patient Room 1', type: 'Pressure', reading: '1005 hPa' },
	{ location: 'Patient Room 1', type: 'Air Quality', reading: 'Good' },
	{ location: 'Patient Room 2', type: 'Humidity', reading: '55' },
	{ location: 'Patient Room 2', type: 'Pressure', reading: '1010 hPa' },
	{ location: 'Patient Room 2', type: 'Air Quality', reading: 'Good' },
	{ location: 'Patient Room 3', type: 'Humidity', reading: '60' },
	{ location: 'Patient Room 3', type: 'Pressure', reading: '1000 hPa' },
	{ location: 'Patient Room 3', type: 'Air Quality', reading: 'Good' },
	// Add more data for the patient rooms...
];

const SensorMonitor = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		// Fetch data from API
		// For now, we'll use mock data
		setData(mockData);
	}, []);

	const getStatus = (type, reading) => {
		switch (type) {
			case 'Humidity':
				const humidity = parseInt(reading);
				if (humidity < 30) {
					return 'Low';
				} else if (humidity > 60) {
					return 'High';
				} else {
					return 'Normal';
				}
			case 'Pressure':
				const pressure = parseInt(reading);
				if (pressure < 1000) {
					return 'Low';
				} else if (pressure > 1020) {
					return 'High';
				} else {
					return 'Normal';
				}
			case 'Air Quality':
				return reading === 'Good' ? 'Normal' : 'Alert';
			default:
				return 'Unknown';
		}
	};

	// Group data by location
	const groupedData = data.reduce((groups, item) => {
		const group = (groups[item.location] || []);
		group.push(item);
		groups[item.location] = group;
		return groups;
	}, {});

	return (
		<div className="captor-monitor">
			<h2>Sensor Monitoring</h2>
			<div className="room-cards">
				{Object.entries(groupedData).map(([location, items]) => (
					<div key={location} className="room-card">
						<h3>{location}</h3>
						{items.map((item, index) => {
							const status = getStatus(item.type, item.reading);
							let icon;
							switch (item.type) {
								case 'Humidity':
									icon = faTint;
									break;
								case 'Pressure':
									icon = faTachometerAlt;
									break;
								case 'Air Quality':
									icon = item.reading === 'Good' ? faWind : faSmog;
									break;
								default:
									icon = null;
							}
							return (
								<div key={index} className={`sensor ${status === 'Normal' ? '' : 'alert'}`}>
									<div className="sensor-icon">
										<FontAwesomeIcon icon={icon} />
									</div>
									<div className="sensor-info">
										<div className="sensor-type">{item.type}</div>
										<div className="sensor-reading">{item.reading}</div>
									</div>
									<div className="sensor-status">{status}</div>
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
};

export default SensorMonitor;
