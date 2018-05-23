//import library
import React from 'react';
import { View, Text } from 'react-native';

//make components
const Header = (props) => {
	const { textStyles, viewStyles } = styles;

	return (
		<View style={viewStyles}>
			<Text style={textStyles}>{props.headerText}</Text>
		</View>
		);
};

const styles = {
	viewStyles: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative',
	},
	textStyles: {
		fontSize: 20
	},
};

//make component available for other parts of the app
export { Header };
