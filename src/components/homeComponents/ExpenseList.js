import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import ExpenseDetail from './ExpenseDetail';
import Storages from './../../actions/Storages';

const Global = require('./../../Global');

class ExpenseList extends Component {
  state = { expenseList: [] };

  componentWillMount() {
    const uid = Global.EMAIL;
    Storages.get(uid).then(result => {
      console.log('result', result);
      this.setState({ expenseList: result.transactions });
    });
  }

  renderExpenses() {
    return this.state.expenseList.map(expense =>
      <ExpenseDetail expense={expense} />
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

export { ExpenseList };
