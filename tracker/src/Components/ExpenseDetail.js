import React from 'react';
import { Text, View } from 'react-native';
import { Card, CardSection } from './Common';

const ExpenseDetail = ({ expense }) => {
	const { amount, time, description } = expense;
	const { cardStyle, amountStyle, timeStyle, descriptionStyle, rightStyle, leftStyle } = styles;
	return (
		<View style={cardStyle}>
			<View style={leftStyle}>
				<CardSection>
					<Text style={amountStyle}>£ {amount} </Text>
				</CardSection>
			</View>


			<View style={rightStyle}>
				<CardSection>
					<Text style={timeStyle}>{time}</Text>
				</CardSection>

				<CardSection>
					<Text style={descriptionStyle}>{description}</Text>
				</CardSection>
			</View>
		</View>
	);
};

const styles = {
	cardStyle: {
		paddingTop: 10,
		paddingBottom: 8,
		paddingHorizontal: 20,
		flexDirection: 'row',
		height: 70,
		borderBottomWidth: 0.2,
		borderColor: 'white',
		backgroundColor: '#000a29'
	},
	leftStyle: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	rightStyle: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	amountStyle: {
		color: 'white',
		textAlign: 'left',
		fontSize: 24,
	},
	timeStyle: {
		color: 'white',
		textAlign: 'right',
		marginBottom: 5,
	},
	descriptionStyle: {
		color: 'white',
		fontSize: 20,
		textAlign: 'right',
		fontFamily: 'TitilliumWeb-Regular',
	}
};

export default ExpenseDetail;
