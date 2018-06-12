import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ExpenseDetail from './homeComponents/ExpenseDetail';
import Storages from './../actions/Storages';

const Global = require('./../Global');

class ExpensePage extends Component {
	state = { expenseList: [] };

/* Fetch JSON from http */
	componentWillMount() {
    const uid = Global.UID;
		Storages.get(uid)
			.then(result => this.setState({ expenseList: result.trans }));

    //An example TX for testing
    // const exampleTX = {
    //       txid: '1',
    //       from_user: 'uid',
    //       to_user: '3',
    //       currency: 0,
    //       amount: 'howMuch',
    //       time: 'dateCreated loooooooog',
    //       description: 'description',
    //       status: 0,
    //       gid: null
    //     };

    // this.setState({ expenseList: [exampleTX] });
	}

	renderExpenses() {
		return this.state.expenseList.map(expense =>
			<ExpenseDetail key={expense.txid} expense={expense} />
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
