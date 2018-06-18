import React, { Component } from 'react';
import { View, Text } from 'react-native';

class BillDetails extends Component {
  state = { 
    author: '',
    description: '',
    groupID: '',
    payee: '',
    totalPrice: 0,
    timestamp: '',
    items: [],
    split: []
  }

  componentWillMount() {
    console.log('bill details', this.props.billDetails);
    const { author, description, groupID, items, payee, split, timestamp, totalPrice } = this.props.billDetails;
    this.state = {
      author,
      description,
      groupID,
      payee,
      totalPrice,
      timestamp,
      items,
      split
    };
    console.log('state', this.state);
  } 

  renderItems() {
    return this.state.items.map(item => 
      <ItemDetail key={item.id} item={item} />
    );
  }

  render() {
    return (
      <View>
        <View>
          <Text>description: {this.state.description} </Text>
        </View>
        <View>
          <Text>payee: {this.state.payee} </Text>
        </View>
        <View>
          <Text>totalPrice: {this.state.totalPrice} </Text>
        </View>
        <View>
          <Text>timestamp: {this.state.timestamp} </Text>
        </View>
        <View>
          {this.renderItems()}
        </View>
      </View>
    );
  }
}

const ItemDetail = ({ item }) => {
  const { name, price, split } = item;
  return (
    <View style={{ borderTopWidth: 0.5 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text>{name}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{price}</Text>
        </View>
      </View>
      <Text style={{ alignSelf: 'center' }}>Split with</Text>
      <View style={{ alignSelf: 'flex-end', paddingRight: 20 }}>
        {renderSplitUser({ split })}
      </View>
    </View>
  );
};

const renderSplitUser = ({ split }) => {
  return split.map(user => 
    <View>
      <View>
        <Text>{user.user}</Text>
      </View>
      <View>
        <Text>£ {parseFloat(user.splitAmount).toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default BillDetails;
