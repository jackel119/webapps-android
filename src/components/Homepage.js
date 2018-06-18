import React from 'react';
import { View, StatusBar, ScrollView, Image, Dimensions } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { InOutBalance, ExpenseList, HeaderGreeting } from './homeComponents';

const Homepage = () => {
	const window = Dimensions.get('window');
	return (
		<View style={{ flex: 1 }}>
			<ParallaxScrollView
				style={{ flex: 1, backgroundColor: 'white', overflow: 'hidden' }}
				parallaxHeaderHeight={385}
				contentBackgroundColor={'#0a0809'}
				isForegroundTouchable
				renderBackground={() =>
				<Image
					style={{ width: null, height: 300 }}
					source={require('./Img/header1.jpg')}
				/>}
				renderForeground={() => (
					<View style={{ flexDirection: 'column' }}>
						<StatusBar barStyle="light-content" />
						<HeaderGreeting />
						<View style={{ marginTop: 0 }}>
							<InOutBalance />
						</View>
					</View>
				)}
				// renderStickyHeader={() => (
				// 	<InOutBalance />
				// )}
				// stickyHeaderHeight={85}
			>
				<ExpenseList />
			</ParallaxScrollView>

		</View>
	);
};

export default Homepage;
