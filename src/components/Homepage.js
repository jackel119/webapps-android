import React from 'react';
import { View, StatusBar } from 'react-native';
import { DebitCredit, ExpenseList, HeaderGreeting } from './homeComponents';

const Homepage = () => {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" />
			<HeaderGreeting />
			<DebitCredit />
		</View>

	);
};

export default Homepage;
