//import library
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

//make components
const HeaderGreeting = (props) => {
	const { greetingStyle, spentStyle, imageStyle, containerStyle, white } = styles;
	return (
		<ImageBackground 
			style={imageStyle}
			source={{ uri: props.img }}
		>
			<View style={containerStyle}>
				<Text style={greetingStyle}>Good Morning,</Text>
				<Text style={greetingStyle}>Jack.</Text>
				<Text style={white}>You have spent</Text>
				<Text style={spentStyle}>£12345.67</Text>
				<Text style={white}>this week.</Text>
			</View>
		</ImageBackground>
	);
};

const styles = {
	white: {
		color: 'white',
		textAlign: 'right',
		marginRight: 10
	},
	containerStyle: {
		top: 0,
		alignContent: 'space-between',
	},
	greetingStyle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'white',
    opacity: 0.9
	},
	spentStyle: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white',
    opacity: 0.9
	},
	imageStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 300,
		width: null //to make sure the img spread across the page

	},
};

//make component available for other parts of the app
export default HeaderGreeting;
