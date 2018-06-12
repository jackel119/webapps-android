import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ExpenseDetail from './ExpenseDetail';
import Storages from './../../actions/Storages';

const Global = require('./../../Global');

class ExpenseList extends Component {
	state = { expenseList: [] };

/* Fetch JSON from http */
	componentWillMount() {
		// axios.get('http://10.0.2.2:8000/transaction.json')
		// 	.then(response => this.setState({ expenseList: response.data }));
		const uid = Global.UID;
		Storages.get(uid).then(result => this.setState({ expenseList: result.trans }));
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
