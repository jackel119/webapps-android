import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ExpenseDetail from './ExpenseDetail';
import Storages from './../../actions/Storages';

const Global = require('./../../Global');

class ExpenseList extends Component {
	state = { expenseList: [] };

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
