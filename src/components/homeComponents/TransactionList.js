import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import TransactionDetails from './TransactionDetails';
import Storages from './../../actions/Storages';

const Global = require('./../../Global');

class TransactionList extends Component {
  state = { expenseList: [] };

  componentWillMount() {
    Storages.get(Global.EMAIL).then(result => {
      console.log('result', result);
      this.setState({ expenseList: result.transactionBillMap });
    });
  }

  renderExpenses() {
    return this.state.expenseList.map((transaction, index) =>
      <TransactionDetails key={index} transaction={transaction} />
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderExpenses()}
      </ScrollView>
    );
  }
}

export { TransactionList };
