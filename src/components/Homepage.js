import React from 'react';
import { View, StatusBar, ScrollView, Image } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { InOutBalance, ExpenseList, HeaderGreeting } from './homeComponents';

const Homepage = () => {
	return (
		<View style={{ flex: 1 }}>
			<ParallaxScrollView
				style={{ flex: 1, backgroundColor: 'white', overflow: 'hidden' }}
				parallaxHeaderHeight={385}
				renderBackground={() =>
				<Image
					style={{ width: null, height: 300 }}
					source={require('./Img/header1.jpg')}
				/>}
				renderForeground={() => (
					<View>
						<StatusBar barStyle="light-content" />
						<HeaderGreeting />
						<InOutBalance />
					</View>
				)}
				renderStickyHeader={() => (
					<View>
						<InOutBalance />
					</View>
				)}
				stickyHeaderHeight={85}
			>
				<ExpenseList />
			</ParallaxScrollView>

		</View>
	);
};

export default Homepage;
