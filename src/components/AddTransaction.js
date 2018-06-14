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

    if (this.props.scannedItems) {
      for (var item of this.props.scannedItems) {
        this.counter += 1;
        this.props.addItem({ initial: true, id: this.counter, name: item.name, price: item.price });
      }
    } else {
      this.counter += 1;
      this.props.addItem({ initial: false, id: this.counter });
    }
  }

  onAddItem() {
    this.counter += 1;
    this.props.addItem({ initial: false, id: this.counter });
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

  submit() {
    Actions.split({ data: this.props.data });
  }

  renderTop() {
    let total = 0;
    for (var item of this.props.data) {
      total = total + this.convertToNumber(item.price);
    }
    return (
      <CardSection>
        <View style={styles.topStyle} >
          <Text style={styles.totalAmountStyle}> Total Amount </Text>
          <Text style={styles.totalAmountStyle}> {total.toFixed(2)} </Text>
        </View>
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
                value={data.name}
                onChangeText={value => this.props.transactionUpdate({
                index: data.id, type: 'name', value })}
              />
            </CardSection>
            <CardSection>
              <Input
                label="Amount"
                placeholder="Item Amount"
                value={data.price.toString()}
                onChangeText={value => this.props.transactionUpdate({
                index: data.id, type: 'price', value })}
              />
            </CardSection>
          </View>
        );
    });
    return (
      <View style={styles.containerStyle}>
        <View style={{ flex: 0.1 }}>
          {this.renderTop()}
        </View>
        <View style={{ flex: 0.8 }}>
          <ScrollView>
            {renderAddItem}
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={{ flex: 0.5 }} />
              <Button onPress={this.onAddItem} >
                Add Item
              </Button>
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.1 }}>
          <Button onPress={this.submit.bind(this)}>
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state.receipt;
  return { data } ;
};

const styles = {
  containerStyle: {
    marginTop: 10,
    paddingHorizontal: 20,
    flex: 1
  },

  topStyle: {
    padding: 2,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
  },

  totalAmountStyle: {
    fontSize: 24,
    //textAlign: 'right',
    //alignSelf: 'flex-end',
  }
};

export default connect(mapStateToProps, { transactionUpdate, addItem })(AddTransaction);
