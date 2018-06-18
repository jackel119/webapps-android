import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import ExpensePageDetail from './ExpensePageDetail';
import Storages from './../actions/Storages';

const Global = require('./../Global');

class ExpensePage extends Component {
	state = { expenseList: [] };

/* Fetch JSON from http */
	componentWillMount() {
		Storages.get(Global.EMAIL)
			.then(result => this.setState({ expenseList: result.transactions }));
	}

	renderExpenses() {
		return this.state.expenseList.map(expense =>
			<ExpensePageDetail key={expense} expense={expense} />
		);
	}

	render() {
		console.log(this.state);
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.addButtonStyle} onPress={Actions.addBill}>
					<Icon name="plus" color='white' size={20} style={styles.iconStyle} />
					<Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Add New</Text>
				</TouchableOpacity>
				<ScrollView>
					{this.renderExpenses()}
				</ScrollView>
			</View>
		);
	}
}

const styles = {
  container: {
    paddingHorizontal: 5,
  },
	addButtonStyle: {
		marginVertical: 5,
		borderRadius: 5,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'sandybrown',
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderColor: '#ddd',
	},
};


export default ExpensePage;
