// Notifications.js

import React, { useState } from 'react';
import './Notifications.css';  // Import the CSS

const Notifications = ({ notifications, setNotifications, history, setHistory }) => {

	const handleAction = (notification, action) => {
		// Add the action to the history
		setHistory(prevHistory => [...prevHistory, { notification, action }]);
		// Remove the notification
		setNotifications(prevNotifications => prevNotifications.filter(n => n !== notification));
	};

	return (
		<div>
			<h2>Notifications</h2>
			{notifications.map((notification, index) => (
				<div key={index} className="notification">
					<p>{notification}</p>
					<button onClick={() => handleAction(notification, 'Accepted')}>Accept</button>
					<button onClick={() => handleAction(notification, 'Refused')}>Refuse</button>
				</div>
			))}
			<h2>History</h2>
			{history.map((item, index) => (
				<p key={index}>{item.notification} - {item.action}</p>
			))}
		</div>
	);
};

export default Notifications;
