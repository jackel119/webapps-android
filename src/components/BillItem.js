import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input } from './common';


class BillItem extends Component {

  render() {
    const id = this.props.data.id;

    return (
      <View>
        <CardSection>
          <Input
            label={'Item ' + id} 
            placeholder="Item Name"
            value={this.props.data.name}
            onChangeText={value => this.props.transactionUpdate({ 
            index: id, type: 'name', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Amount"
            placeholder="Item Amount"
            value={this.props.data.amount}
            onChangeText={value => this.props.transactionUpdate({ 
            index: id, type: 'amount', value })}
          />
        </CardSection>
      </View>
    );
  }
}

export default connect()(BillItem);

