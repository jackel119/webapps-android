import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Button, Input } from './common';
import { transactionUpdate, addItem } from '../actions';
import { Actions } from 'react-native-router-flux';

class AddTransaction extends Component {

  constructor(props) {
    super(props);
    this.onAddItem = this.onAddItem.bind(this);
    this.counter = 0;
  }

  onAddItem() {
    this.counter += 1;
    this.props.addItem({ id: this.counter });
  }

  onBottunPress() {
    console.log(this.state.data);
  }

  convertToNumber(amount) {
    if (amount) {
      return parseFloat(amount);
    }
    return 0;
  }
  
  renderTop() {
    console.log('current data', this.props.data);
    let total = 0;
    for (var item of this.props.data) {
      console.log(item);
      total = total + this.convertToNumber(item.amount);
    }
    return (
      <CardSection>
        <Text style={{ fontSize: 24 }}> Total Amount </Text>
        <Text style={{ fontSize: 24 }}> {total.toFixed(2)} </Text>
        <Button onPress={() => Actions.split(this.props.data)}>
          Submit
        </Button>
      </CardSection>
    );
  }

  render() {
    let renderAddItem = this.props.data.map((data, index) => {
        return (
          <View key={index}>
            <CardSection>
              <Input
                label={'Item ' + data.id} 
                placeholder="Item Name"
                value={this.props.data.name}
                onChangeText={value => this.props.transactionUpdate({ 
                index: data.id, type: 'name', value })}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Amount"
                placeholder="Item Amount"
                value={this.props.data.amount}
                onChangeText={value => this.props.transactionUpdate({ 
                index: data.id, type: 'amount', value })}
              />
            </CardSection>
          </View>
        );
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          {this.renderTop()}
        </View>
        <View style={{ flex: 0.8 }}>
          <ScrollView>
            {renderAddItem}
          </ScrollView>
        </View>
        <View style={{ flex: 0.1 }}>
          <Button onPress={this.onAddItem} >
            Add Item  
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state.receipt;
};

export default connect(mapStateToProps, { transactionUpdate, addItem })(AddTransaction);