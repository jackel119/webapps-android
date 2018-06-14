import React from 'react';
import { View, StatusBar } from 'react-native';
import { InOutBalance, ExpenseList, HeaderGreeting } from './homeComponents';

const Homepage = () => {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" />
			<HeaderGreeting />
			<InOutBalance />
      <ExpenseList />
		</View>

	);
};

export default Homepage;
