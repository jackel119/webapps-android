import React from 'react';
import { View, StatusBar, Image } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { InOutBalance, TransactionList, HeaderGreeting } from './homeComponents';

const Homepage = () => {
	return (
		<View style={{ flex: 1 }}>
			<ParallaxScrollView
				style={{ flex: 1, backgroundColor: 'white', overflow: 'hidden', paddingTop: 10 }}
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
						<InOutBalance />
					</View>
				)}
			>
				<TransactionList />
			</ParallaxScrollView>
		</View>
	);
};

export default Homepage;
