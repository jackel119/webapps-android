import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import ExpenseDetail from './ExpenseDetail';

class ExpenseList extends Component {
	state = { expenseList: [] };

/* Fetch JSON from http */
	componentWillMount() {
		axios.get('http://0.0.0.0:8000/transaction.json')
			.then(response => this.setState({ expenseList: response.data }));
	}

	renderExpenses() {
		return this.state.expenseList.map(expense =>
			<ExpenseDetail key={expense.txid} expense={expense} />
		);
	}

	render() {
		console.log(this.state);
		return (
			<ScrollView>
				{this.renderExpenses()}
			</ScrollView>
		);
	}
}

export { ExpenseList };
