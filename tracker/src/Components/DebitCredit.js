import React from 'react';
import { View, Text } from 'react-native';
import { CardSection } from './Common';

const DebitCredit = () => {
	const { headerContentStyle,
		debitStyle,
		creditStyle,
		textStyle,
		fontStyle } = styles;

	return (
		<CardSection style={headerContentStyle}>
			<View style={debitStyle}>
				<Text style={fontStyle}>Debit</Text>
				<Text style={textStyle}>£123</Text>
			</View>

			<View style={creditStyle}>
				<Text style={fontStyle}>Credit</Text>
				<Text style={textStyle}>£456</Text>
			</View>
		</CardSection>
	);
};

/*f9ba32 */
const styles = {
	headerContentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	debitStyle: {
		flex: 1,
		height: 90,
		paddingTop: 5,
		paddingHorizontal: 20,
		backgroundColor: '#f9ba32',
		//justifyContent: 'space-around'
	},
	creditStyle: {
		flex: 1,
		height: 90,
		paddingTop: 5,
		paddingHorizontal: 20,
		backgroundColor: '#ff4e50',
		//justifyContent: 'space-around'
	},
	textStyle: {
		fontFamily: 'TitilliumWeb-Regular',
		//margin: 30,
    fontSize: 36,
    textAlign: 'right',
    //justifyContent: 'flex-start',
    color: 'white',
	},
	fontStyle: {
		fontFamily: 'AlegreyaSansSC-Medium',
		color: 'white',
		fontSize: 20
	}
};

export default DebitCredit;
