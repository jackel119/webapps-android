import React from 'react';
import { Text, View } from 'react-native';
import { Card, CardSection } from './Common';

const ExpenseDetail = ({ expense }) => {
	const { amount, time, description } = expense;
	const { cardStyle, amountStyle, timeStyle, descriptionStyle } = styles;
	return (
		<View style={cardStyle}>
			<CardSection>
				<Text style={amountStyle}>£ {amount}</Text>
			</CardSection>

			<CardSection>
				<Text style={timeStyle}>{time}</Text>
			</CardSection>

			<CardSection>
				<Text style={descriptionStyle}>{description}</Text>
			</CardSection>

		</View>
	);
};

const styles = {
	cardStyle: {
		flex: 1,
		height: 70,
		backgroundColor: '#000a29'
	},
	amountStyle: {
		color: 'white',
		flex: 1
	},
	timeStyle: {
		color: 'white',
		flex: 1
	},
	descriptionStyle: {
		color: 'white',
		flex: 1 
	}
};

export default ExpenseDetail;
