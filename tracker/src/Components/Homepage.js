import React from 'react';
import { View, StatusBar } from 'react-native';
import { DebitCredit, ExpenseList, HeaderGreeting } from './homeComponents';

const Homepage = () => {
	return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" />
			<HeaderGreeting img='https://images.unsplash.com/photo-1514828260103-1e9bf9a58446?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f36a98f5f1b150a523b924915c1544a5&auto=format&fit=crop&w=1950&q=80' />
			<DebitCredit />
			<ExpenseList />
		</View>

	);
};

export default Homepage;
