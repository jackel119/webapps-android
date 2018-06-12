import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input } from './common';
import { transactionUpdate, addItem } from '../actions';

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
        <View style={{ flex: 0.9 }}>
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

