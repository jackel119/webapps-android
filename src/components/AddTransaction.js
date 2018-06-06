import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button } from './common';
import { transactionCreate, transactionUpdate } from '../actions';

class AddTransaction extends Component {

  onBottunPress() {
    const { to, from, date, currency, amount } = this.props;
    this.props.transactionCreate({ to, from, date, currency, amount });
  }

  render() {
    return (
      <View>
        <Card>
          <StatusBar barStyle="dark-content" />
          <CardSection>
            <Input
              label="To"
              placeholder="To"
              value={this.props.to}
              onChangeText={value => this.props.transactionUpdate({ prop: 'to', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="From"
              placeholder="From"
              value={this.props.from}
              onChangeText={value => this.props.transactionUpdate({ prop: 'from', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Date"
              placeholder="Date"
              value={this.props.date}
              onChangeText={value => this.props.transactionUpdate({ prop: 'date', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Currency"
              placeholder="Currency"
              value={this.props.currency}
              onChangeText={value => this.props.transactionUpdate({ prop: 'currency', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Amount"
              placeholder="Amount"
              value={this.props.amount}
              onChangeText={value => this.props.transactionUpdate({ prop: 'amount', value })}
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.onBottunPress.bind(this)}>
              Add New Transaction
            </Button>
          </CardSection>

        </Card>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { to, from, date, currency, amount } = state.transaction;
  return { to, from, date, currency, amount };
};

export default connect(mapStateToProps, { transactionUpdate, transactionCreate })(AddTransaction);
