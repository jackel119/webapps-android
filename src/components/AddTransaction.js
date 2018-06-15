import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Button, Input } from './common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { transactionUpdate, addItem, initialiseState } from '../actions';
import { Actions } from 'react-native-router-flux';

class AddTransaction extends Component {

  constructor(props) {
    super(props);
    this.onAddItem = this.onAddItem.bind(this);
    this.counter = 0;

    this.props.initialiseState();
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
      total += this.convertToNumber(item.price);
    }
    return (
      <View style={styles.topStyle} >
        <Text style={styles.totalAmountStyle}> Total Amount </Text>
        <Text style={styles.totalAmountNumber}> {total.toFixed(2)} </Text>
      </View>
    );
  }

  render() {
    let renderAddItem = this.props.data.map((data, index) => {
        return (
          <View style={styles.newItemStyle} key={index}>
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
                style={{ paddingRight: 10 }}
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
        <View style={{ flex: 0.8 }}>
          <ScrollView>
            <View>
              {renderAddItem}
            </View>
            <View style={styles.addItemStyle}>
              <View style={{ flex: 1.5 }} />
              <TouchableOpacity style={styles.addButtonStyle} onPress={this.onAddItem}>
                <Icon name="plus" size={20} style={styles.iconStyle} />
                <Text style={{ fontSize: 16 }}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        <View style={{ flex: 0.1 }}>
          {this.renderTop()}
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
  return { data };
};

const styles = {
  containerStyle: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 5,
    flex: 1,
    //backgroundColor: 'white'
  },

  topStyle: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    backgroundColor: 'lightyellow',
    borderColor: '#ddd',
    position: 'relative',
    paddingRight: 15,
    alignItems: 'flex-end',
  },

  totalAmountStyle: {
    fontSize: 16,
    paddingRight: 15,
  },

  totalAmountNumber: {
    fontSize: 20,
  },

  addItemStyle: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    //paddingTop: 5,
  },

  newItemStyle: {
    marginBottom: 5,
  },

  addButtonStyle: {
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'lightblue',
    flexDirection: 'row'
  },

  iconStyle: {
    fontSize: 15,
    paddingRight: 5,
  }
};

export default connect(mapStateToProps, { transactionUpdate, addItem, initialiseState })(AddTransaction);
