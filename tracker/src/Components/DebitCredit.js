import React from 'react';
import { View, Text } from 'react-native';
import { CardSection } from './Common';

const DebitCredit = () => {
	const { headerContentStyle, debitStyle, creditStyle, textStyle } = styles;
	return (
		<CardSection style={headerContentStyle}>
			<View style={debitStyle}>
				<Text style={textStyle}>Debit</Text>
				<Text style={textStyle}>£123</Text>
			</View>

			<View style={creditStyle}>
				<Text style={textStyle}>Credit</Text>
				<Text style={textStyle}>£456</Text>
			</View>
		</CardSection>
	);
};


const styles = {
	headerContentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	debitStyle: {
		flex: 1,
		height: 100,
		backgroundColor: '#75b1a9'
	},
	creditStyle: {
		flex: 1,
		height: 100,
		backgroundColor: '#acd0c0'
	},
	textStyle: {
		margin: 24,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start', 
    color: 'white',
	}
};

export default DebitCredit;
