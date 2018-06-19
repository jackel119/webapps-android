import React, { Component } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import BillHistoryItem from './BillHistoryItem';
import Storages from './../actions/Storages';

const Global = require('./../Global');

class BillHistory extends Component {
  state = { bills: [] };

  componentWillMount() {
    Storages.get(Global.EMAIL).then(result => {
      this.setState({ bills: result.bills.map(res => res.bdata) });
      console.log('billlllls', this.state.bills);
    });
  }

  renderBills() {
    return this.state.bills.map((bill, index) =>
      <BillHistoryItem key={index} bill={bill} />
    );
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButtonStyle} onPress={Actions.addBill}>
          <Icon name="plus" color='white' size={20} style={styles.iconStyle} />
          <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}> Add Bill</Text>
        </TouchableOpacity>
        <ScrollView>
          {this.renderBills()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    paddingHorizontal: 5,
    flex: 1,
  },
  addButtonStyle: {
    marginVertical: 5,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'sandybrown',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
};


export default BillHistory;
