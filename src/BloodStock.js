import { useEffect } from "react";
import { Card, Badge, Row, Col } from 'antd';

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
	}, [setData]);

	return (
		<Row gutter={16}>
			{Object.entries(data).map(([hospital, bloodTypes]) => (
				<Col span={12} key={hospital}>
					<Card title={hospital} style={{ margin: '20px 0', backgroundColor: '#fafafa' }}>
						<Row gutter={16}>
							{Object.entries(bloodTypes).slice(0, 4).map(([type, count], index) => (
								<Col span={6} key={type}>
									<p style={{ color: '#1890ff' }}>
										{type}:
										<Badge
											count={count}
											style={{ backgroundColor: count > lowStockThreshold ? '#52c41a' : '#f5222d', marginLeft: '10px' }}
										/>
									</p>
								</Col>
							))}
						</Row>
						<Row gutter={16}>
							{Object.entries(bloodTypes).slice(4).map(([type, count], index) => (
								<Col span={6} key={type}>
									<p style={{ color: '#1890ff' }}>
										{type}:
										<Badge
											count={count}
											style={{ backgroundColor: count > lowStockThreshold ? '#52c41a' : '#f5222d', marginLeft: '10px' }}
										/>
									</p>
								</Col>
							))}
						</Row>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default BloodStock;
