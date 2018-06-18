import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ExpenseDetail from './homeComponents/ExpenseDetail';
import Storages from './../actions/Storages';

const Global = require('./../Global');

class ExpensePage extends Component {
	state = { expenseList: [] };

/* Fetch JSON from http */
	componentWillMount() {
		Storages.get(Global.EMAIL)
			.then(result => this.setState({ expenseList: result.transactionBillMap }));
	}

	renderExpenses() {
		return this.state.expenseList.map(expense =>
			<ExpenseDetail key={expense} expense={expense} />
		);
	}

	render() {
		console.log(this.state);
		return (
			<ScrollView style={styles.container}>
				{this.renderExpenses()}
			</ScrollView>
		);
	}
}

const styles = {
  container: {
    backgroundColor: '#000a29'
  },
};


export default ExpensePage;
