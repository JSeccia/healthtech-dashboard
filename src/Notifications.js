import React from 'react';
import { Alert, Timeline, Button } from 'antd';

const Notifications = ({ notifications, setNotifications, history, setHistory }) => {

	const handleAction = (notification, action) => {
		// Add the action to the history
		setHistory(prevHistory => [...prevHistory, { notification, action }]);
		// Remove the notification
		setNotifications(prevNotifications => prevNotifications.filter(n => n !== notification));
	};

	return (
		<div style={{ margin: '20px' }}>
			<h2>Notifications</h2>
			{notifications.map((notification, index) => (
				<Alert
					key={index}
					message={notification}
					type="info"
					action={
						<Button size="small" onClick={() => handleAction(notification, 'Acknowledged')}>
							Acknowledge
						</Button>
					}
					style={{ marginBottom: '10px' }}
				/>
			))}
			<h2>History</h2>
			<Timeline>
				{history.map((item, index) => (
					<Timeline.Item key={index}>
						{item.notification} - {item.action}
					</Timeline.Item>
				))}
			</Timeline>
		</div>
	);
};

export default Notifications;
