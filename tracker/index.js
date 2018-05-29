/* Import libraries */
import React, { Component } from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';
import io from 'socket.io-client';

/* Import locals */
import { CardSection } from './src/Components/Common';
import DebitCredit from './src/Components/DebitCredit';
import HeaderGreeting from './src/Components/HeaderGreeting';
import ExpenseList from './src/Components/ExpenseList';

/* Create components */
class App extends Component {

  constructor(props) {
    super(props);
    this.socket = io.connect('http://10.0.2.2:2605');
    this.socket.on('connect', () => {
      this.socket.emit('hello-message', {message: 'hello backend! from, frontend!'});
    });
  }


	render() {
		return (
		<View style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" />
			<HeaderGreeting img='https://images.unsplash.com/photo-1514828260103-1e9bf9a58446?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f36a98f5f1b150a523b924915c1544a5&auto=format&fit=crop&w=1950&q=80' />
			<DebitCredit />

			<CardSection>
				<ExpenseList />
			</CardSection>

		</View>
	);
	}
}

/* Render components to device */
AppRegistry.registerComponent('tracker', () => App);
