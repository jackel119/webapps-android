import React, { Component } from 'react';
import { View, Text } from 'react-native';

class BillDetails extends Component {
  state = { 
    description: 'description',
    itemList: [
      {
        itemname: 'apple',
        price: 1.5,
        split: [
          { useremail: 'useremail', splitAmount: 'splitAmount' },
          { useremail: 'useremail', splitAmount: 'splitAmount' }
        ]
      },
      {
        itemname: 'apple',
        price: 1.5,
        split: [
          { useremail: 'useremail', splitAmount: 'splitAmount' },
          { useremail: 'useremail', splitAmount: 'splitAmount' }
        ]
      },
      {
        itemname: 'apple',
        price: 1.5,
        split: [
          { useremail: 'useremail', splitAmount: 'splitAmount' },
          { useremail: 'useremail', splitAmount: 'splitAmount' }
        ]
      },
      {
        itemname: 'apple',
        price: 1.5,
        split: [
          { useremail: 'useremail', splitAmount: 'splitAmount' },
          { useremail: 'useremail', splitAmount: 'splitAmount' }
        ]
      }
    ]
  } 

  renderItems() {
    console.log(this.state.itemList);
    return this.state.itemList.map(item => 
      <ItemDetail item={item} />
    );
  }

  render() {
    return (
      <View>
        <View>
          <Text>description: {this.state.description} </Text>
        </View>
        <View>
          {this.renderItems()}
        </View>
      </View>
    );
  }
}

const ItemDetail = ({ item }) => {
  const { itemname, price, split } = item;
  return (
    <View style={{ borderTopWidth: 0.5 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text>{itemname}</Text>
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
        <Text>{user.useremail}</Text>
      </View>
      <View>
        <Text>{user.splitAmount}</Text>
      </View>
    </View>
  );
};

export default BillDetails;
