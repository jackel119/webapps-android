import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
	return (
		<View style={styles.containerStyle}>
			{props.children}
		</View>
	);
};

const styles = {
	containerStyle: {
		borderRadius: 1,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		elevation: 1,
	}
};

export { Card };
