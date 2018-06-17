import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Input, TextInput } from './common';
import Icon from 'react-native-vector-icons/FontAwesome';
import { transactionUpdate, addItem, initialiseState, updateTotal, updateDescription } from '../actions';


class AddBill extends Component {

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
    } 
  }


  onAddItem() {
    this.counter += 1;
    this.props.addItem({ initial: false, id: this.counter });
  }


  convertToNumber(amount) {
    if (amount) {
      return parseFloat(amount);
    }
    return 0;
  }

  convertToString(number) {
    if (number) {
      return number.toString();
    }
    return '';
  }

  submit() {
    Actions.split({ items: this.props.data, description: this.props.description, total: this.props.total });
  }

  renderTop() {
    let total = 0;
    for (var item of this.props.data) {
      total += this.convertToNumber(item.price);
    }

    if (!(this.props.data.length == 0)) {
      this.props.updateTotal(total);
    }

    return (
      <View style={styles.topStyle} >
        <Input
          label='Total Amount'
          value={this.convertToString(this.props.total)}
          onChangeText={value => this.props.updateTotal(value)}
        />
        <Input
          label='Description'
          placeholder='Description'
          value={this.props.description}
          onChangeText={value => this.props.updateDescription(value)}
        />
      </View>
    );
  }

  render() {
    const renderAddItem = this.props.data.map((data, index) => {
        return (
          <View style={styles.newItemStyle} key={index}>
            <View style={styles.cardStyle}>
              <Input
                label={'Item ' + data.id}
                placeholder="Item Name"
                value={data.name}
                onChangeText={value => this.props.transactionUpdate({
                index: data.id, type: 'name', value })}
              />
            </View>
            <View style={styles.cardStyle}>
                <Input
                  label="Amount"
                  placeholder="Item Amount"
                  value={data.price.toString()}
                  onChangeText={value => this.props.transactionUpdate({
                  index: data.id, type: 'price', value })}
                />
            </View>
          </View>
        );
    });
    return (
      <View style={styles.containerStyle}>
        <View style={{ flex: 0.7 }}>
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
        <View style={{ flex: 0.2 }}>
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
  const { data, total, description } = state.receipt;
  return { data, total, description };
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
    backgroundColor: 'lightgrey',
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
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

  iconStyle: {
    fontSize: 15,
    paddingRight: 5,
  },

  cardStyle: {
    borderBottomWidth: 1,
    padding: 5,
    paddingRight: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default connect(mapStateToProps, { transactionUpdate, addItem, initialiseState, updateTotal, updateDescription })(AddBill);
