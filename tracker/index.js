/* Import libraries */
import React from 'react';
import { AppRegistry, View} from 'react-native';
/* Import locals */
import { CardSection } from './src/Components/Common';
import DebitCredit from './src/Components/DebitCredit';
import HeaderGreeting from './src/Components/HeaderGreeting';
import ExpenseList from './src/Components/ExpenseList';

/* Create components */
const App = () => (
	<View style={{ flex: 1 }}>
		<HeaderGreeting img='https://images.unsplash.com/photo-1514828260103-1e9bf9a58446?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f36a98f5f1b150a523b924915c1544a5&auto=format&fit=crop&w=1950&q=80' />
		<DebitCredit />

		<CardSection>
			<ExpenseList />
		</CardSection>

	</View>
	);

/* Render components to device */
AppRegistry.registerComponent('tracker', () => App);
