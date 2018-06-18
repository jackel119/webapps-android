import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import ExpenseDetail from './ExpenseDetail';
import Storages from './../../actions/Storages';

const Global = require('./../../Global');

class ExpenseList extends Component {
  state = { expenseList: [] };

  componentWillMount() {
    Storages.get(Global.EMAIL).then(result => {
      console.log('result', result);
      this.setState({ expenseList: result.transactions });
    });
  }

  renderExpenses() {
    return this.state.expenseList.map((expense, index) =>
      <ExpenseDetail key={index} expense={expense} />
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
