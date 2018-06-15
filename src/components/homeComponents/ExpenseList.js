import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import ExpenseDetail from './ExpenseDetail';
import Storages from './../../actions/Storages';

const Global = require('./../../Global');

class ExpenseList extends Component {
  state = { expenseList: [] };

  async componentWillMount() {
    const uid = Global.UID;
    await Storages.get(uid).then(result => {
      this.setState({ expenseList: result.trans });
      console.log(10, result.trans);
    });
  }

  renderExpenses() {
    return this.state.expenseList.map(expense =>
      <ExpenseDetail key={expense.txid} expense={expense} />
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
