import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class BillDetails extends Component {
  state = {}

  componentWillMount() {
    console.log('bill details', this.props.billDetails);
    const { author, description, groupID, items,
      payeeName, split, billDate, totalPrice } = this.props.billDetails;
    this.state = {
      author,
      description,
      groupID,
      payeeName,
      totalPrice,
      billDate,
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

  renderSplit() {
    return this.state.split.map(split =>
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        key={split.user.email}
      >
        <Text>{split.user.first_name} {split.user.last_name}</Text>
        <Text>£ {parseFloat(split.splitAmount).toFixed(2)}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.topStyle}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'cadetblue' }}>
                {this.state.description}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'peru' }}>Total Price: </Text>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'peru' }}>
                {parseFloat(this.state.totalPrice).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end', paddingRight: 5 }}>
            <Text>Payee: {this.state.payeeName} </Text>
            <Text>Date of bill: {this.state.billDate} </Text>
          </View>
        </View>
        <ScrollView style={styles.listStyle}>
          {this.renderItems()}
        </ScrollView>
        <View style={styles.bottomStyle}>
          <View style={{ flex: 0.3 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Summary</Text>
          </View>
          <View style={{ flex: 0.7, paddingTop: 10 }}>
            {this.renderSplit()}
          </View>
        </View>
      </View>
    );
  }
}

const ItemDetail = ({ item }) => {
  const { name, price, split } = item;
  return (
    <View style={styles.itemStyle}>
      <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: '#ddd', }}
      >
        <Text style={{ fontSize: 18 }}>{name}</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{price}</Text>
      </View>
      <View style={{ paddingTop: 5, paddingHorizontal: 15, flexDirection: 'row' }}>
        <View style={{ flex: 0.3 }}>
          <Text style={{ alignSelf: 'flex-start' }}>Split with</Text>
        </View>
        <View style={{ paddingRight: 5, flex: 0.7 }}>
          {renderItemSplit({ split })}
        </View>
      </View>
    </View>
  );
};

const renderItemSplit = ({ split }) => {
  return split.map(user =>
    <View
    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
    key={user.user.email}
    >
      <View>
        <Text>{user.user.first_name} {user.user.last_name}</Text>
      </View>
      <View>
        <Text>£ {parseFloat(user.splitAmount).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    paddingHorizontal: 5,
  },
  topStyle: {
    flex: 0.2,
    marginVertical: 5,
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  listStyle: {
    flex: 0.6,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  bottomStyle: {
    flex: 0.2,
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
  },
  itemStyle: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  }
};


export default BillDetails;
