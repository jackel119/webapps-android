import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import MultiSelect from 'react-native-multiple-select';
import { Button } from './common';
import Storages from './../actions/Storages';
import { socket } from '../Global';

const Global = require('./../Global');


class SplitBill extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPeople: [],
      splitEqually: false,
      items: this.props.items,
      description: this.props.description,
      friends: [],
      total: 0,
      groups: [],
      modalVisible: false,
      splitted: false
    };

    Storages.get(Global.EMAIL).then(res => {
      let result = [];
      result.push({
        id: Global.EMAIL,
        name: 'Me',
        isGroup: false
      });
      this.setState({ groups: res.groups });
      for (var friend of res.friends) {
        result.push({
          id: friend.email,
          name: friend.first_name,
          isGroup: false
        });
      }
      for (var group of res.groups) {
        result.push({
          id: group.gid,
          name: group.gname,
          isGroup: true
        });
      }
      this.setState({ friends: result });
    });


    //update modalVisible for each item
    var i;
    for (i = 0; i < this.state.items.length; i++) {
      this.setModalVisibility(i, false);
      this.state.total += parseFloat(this.state.items[i].price);
    }
  }

  onSelectedItemsChange(selectedPeople) {

    var peopleInvolved = [];
    var groupsInvolved = [];
    for (var selected of selectedPeople) {
      var id = this.state.friends.findIndex((obj => obj.id == selected));
      if (id != -1 && this.state.friends[id].isGroup) {
        for (var group of this.state.groups) {
          if (group.gid == selected) {
            for (var person of group.members) {
              if (!peopleInvolved.includes(person.email)) {
                peopleInvolved.push(person.email);
              }
            }
          }
        }
        groupsInvolved.push(selected);
      } else {
        peopleInvolved.push(selected);
      }
    }

    this.setState({ selectedPeople: peopleInvolved.concat(groupsInvolved) });
    var i;
    for (i = 0; i < this.state.items.length; i++) {
      let temp = this.state.items.slice();
      temp[i].split = [];

      var j;
      for (j = 0; j < peopleInvolved.length; j++) {
        temp[i].split.push({
          user: peopleInvolved[j],
          splitAmount: this.state.items[i].price / (peopleInvolved.length)
        });
        temp[i].selectedPeople = peopleInvolved.concat(groupsInvolved);
      }
      this.setState({ items: temp });
    }
  }

  onSelectedItemsChangeInner(selectedPeople, index) {
    let temp = this.state.items.slice();
    temp[index].split = [];
    var peopleInvolved = [];
    var groupsInvolved = [];

    for (var selected of selectedPeople) {
      var id = this.state.friends.findIndex((obj => obj.id == selected));
      if (id != -1 && this.state.friends[id].isGroup) {
        for (var group of this.state.groups) {
          if (group.gid == selected) {
            for (var person of group.members) {
              if (!peopleInvolved.includes(person.email)) {
                peopleInvolved.push(person.email);
              }
            }
          }
        }
        groupsInvolved.push(selected);
      } else {
        peopleInvolved.push(selected);
      }
    }

    temp[index].selectedPeople = peopleInvolved.concat(groupsInvolved);
    var j;
    for (j = 0; j < peopleInvolved.length; j++) {
      temp[index].split.push({
        user: peopleInvolved[j],
        splitAmount: this.state.items[index].price / (peopleInvolved.length)
      });
    }
    this.setState({ items: temp });
  }

  setModalVisibility(index, visible) {
    let temp = this.state.items.slice();
    temp[index].modalVisible = visible;
    this.setState({ items: temp });
  }

  submitPress() {
    var people = [];
    for (var temp of this.state.items) {
      for (var res of temp.split) {
        var objIndex = people.findIndex((obj => obj.user == res.user));
        if (objIndex == -1) {
          people.push({
            user: res.user,
            splitAmount: res.splitAmount
          });
        } else {
          people[objIndex].splitAmount = people[objIndex].splitAmount + res.splitAmount;
        }
      }
    }
    var result = {};
    result.groupID = null;
    result.users = people.map(obj => obj.user);
    if (!result.users.includes(Global.email)) {
      result.users.push(Global.email);
    }
    result.description = this.state.description;
    result.items = this.state.items.map(res => ({
      id: res.id,
      name: res.name,
      price: res.price,
      split: res.split
    }));
    result.split = people;
    result.totalPrice = this.state.total;
    result.currency = 0;
    result.author = Global.EMAIL;
    result.payee = Global.EMAIL;
    result.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log('client sent: ', result);
    socket.emit('addBill', result);
    socket.on('newBill', data => console.log('backend sent: ', data));
  }

  renderTop() {
    console.log(this.state);
    if (this.state.splitEqually && !(this.state.splitted)) {
      const { selectedPeople } = this.state;
      return (
      <Modal
        isVisible={this.state.modalVisible}
        backdropOpacity={0.5}
      >
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.topStyle}>
            <MultiSelect
              hideTags
              fixedHeight={false}
              items={this.state.friends}
              uniqueKey="id"
              ref={(component) => { this.multiSelect = component; }}
              onSelectedItemsChange={this.onSelectedItemsChange.bind(this)}
              selectedItems={selectedPeople}
              selectText="   Pick Friends"
              searchInputPlaceholderText="Search Friends..."
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
            <View style={{ flex: 0.1 }}>
              <Button
                onPress={() => this.setState({ modalVisible: false, splitted: true })}
              >
                <Text>Complete Split</Text>
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
      );
    } else if (this.state.splitted) {
      return (
        <View style={styles.containerStyle}>
          <Button onPress={() => { this.setState({ splitEqually: true, modalVisible: true, splitted: false }); }}>
            Modify Split
          </Button>
        </View>
      );
    } else {
      return (
        <View style={styles.containerStyle}>
          <Button onPress={() => { this.setState({ splitEqually: true, modalVisible: true }); }}>
            Split Equally?
          </Button>
        </View>
      );
    }
  }

  renderInnerSelect(index) {
    const selectedPeople = this.state.items[index].selectedPeople;
    return (
    <ScrollView style={styles.topStyle}>
      <MultiSelect
        hideTags
        fixedHeight={false}
        items={this.state.friends}
        uniqueKey="id"
        ref={(component) => { this.multiSelect = component; }}
        onSelectedItemsChange={(selected) => this.onSelectedItemsChangeInner(selected, index)}
        selectedItems={selectedPeople}
        selectText="   Pick Friends"
        searchInputPlaceholderText="Search Friends..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
    </ScrollView>
    );
  }

  renderSplit(id) {
    if (this.state.splitEqually) {
      return (
        <TouchableOpacity
          style={styles.selectButtonStyle}
          onPress={() => this.setModalVisibility(id - 1, true)}
        >
          <Text style={{ fontSize: 16 }}>Modify Split</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.selectButtonStyle}
        onPress={() => this.setModalVisibility(id - 1, true)}
      >
        <Text style={{ fontSize: 16 }}>Select People</Text>
      </TouchableOpacity>
    );
  }

  render() {
    if (this.state.items.length == 0) {
      this.state.items.push({
        id: 1,
        name: this.props.description,
        price: this.props.total
      });
    }
    const renderData = this.state.items.map((data, index) => {
      return (
        <View style={styles.cardStyle} key={index}>
          <View style={styles.itemStyle}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 16 }}> {data.id}. </Text>
              <Text style={{ fontSize: 16 }}> {data.name} </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 20 }}> {parseFloat(data.price).toFixed(2)} </Text>
            </View>
          </View>
          <View style={styles.shareStyle}>
            {this.renderSplit(data.id)}
          </View>
          <Modal
            isVisible={this.state.items[data.id - 1].modalVisible}
            backdropOpacity={0.5}
          >
            <View style={{ flex: 1 }}>
              <View>{this.renderInnerSelect(data.id - 1)}</View>
              <View style={styles.cardStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Text style={{ fontSize: 16 }}>
                    {'Item: ' + data.name}
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {'Price: ' + data.price}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 0.1 }}>
                <Button
                  onPress={() => this.setModalVisibility(data.id - 1, false)}
                >
                  <Text>Complete Split</Text>
                </Button>
              </View>
            </View>
          </Modal>
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 0.9 }}>
          <View style={{ flex: 0.2, paddingTop: 5 }}>
            {this.renderTop()}
          </View>
          <View style={styles.containerStyle}>
            <ScrollView>
              {renderData}
            </ScrollView>
          </View>
        </ScrollView>
        <View style={{ flex: 0.1 }}>
          <Button onPress={this.submitPress.bind(this)}>
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    //fontSize: 18,
    height: 23,
    flex: 0.4
  },
  labelStyle: {
    fontSize: 14,
    paddingRight: 14,
    //flex: 1,
  },
  containerStyle: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 5,
    flex: 0.8,
    //backgroundColor: 'white'
  },
  cardStyle: {
    padding: 5,
    flexDirection: 'column',
    paddingVertical: 8,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: '#ddd',
    position: 'relative',
    marginBottom: 5,
  },
  itemStyle: {
    paddingLeft: 20,
    paddingRight: 30,
    flexDirection: 'row',
    paddingBottom: 5,
  },
  shareStyle: {
    paddingRight: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  topStyle: {
    marginBottom: -5,
  },
  selectButtonStyle: {
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
};


export default SplitBill;
