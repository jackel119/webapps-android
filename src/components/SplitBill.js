import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import MultiSelect from 'react-native-multiple-select';
import { Button } from './common';
import Storages from './../actions/Storages';

const Global = require('./../Global');


class SplitBill extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPeople: [],
      splitEqually: false,
      items: this.props.data,
      friends: [],
      total: 0,
      groups: []
    };

    Storages.get(Global.EMAIL).then(res => {
      console.log(res);
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
      console.log(result);
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

    console.log(groupsInvolved, peopleInvolved);

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
    result.description = 'Test description';
    result.items = this.state.items;
    result.split = people;
    result.totalPrice = this.state.total;
    result.currency = 0;
    result.author = Global.EMAIL;
    result.payee = Global.EMAIL;
    result.timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log(result);
  }

  renderTop() {
    if (this.state.splitEqually) {
      const { selectedPeople } = this.state;
      console.log('ON RENDER', selectedPeople);
      return (
      <View style={styles.topStyle}>
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
      </View>
      );
    } else {
      return (
        <View style={styles.topStyle}>
          <Button onPress={() => { this.setState({ splitEqually: true }); }}>
            Split Equally?
          </Button>
        </View>
      );
    }
  }

  renderInnerSelect(index) {
    const selectedPeople = this.state.items[index].selectedPeople;

    return (
    <View style={styles.topStyle}>
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
    </View>
    );
  }

  renderSplit(id) {
    if (this.state.splitEqually) {
      return (
        <Button onPress={() => this.setModalVisibility(id - 1, true)}>
          Modify Split
        </Button>
      );
    }
    return (
      <Button onPress={() => this.setModalVisibility(id - 1, true)}>
        Select People
      </Button>
    );
  }

  render() {
    const renderData = this.props.data.map((data, index) => {
      return (
        <View style={styles.containerStyle} key={index}>
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
              <Text>{'Item: ' + data.name + '  ' + 'Price: ' + data.price }</Text>
              {this.renderInnerSelect(data.id - 1)}
              <Button
                onPress={() => this.setModalVisibility(data.id - 1, false)}
              >
                <Text>Complete Split</Text>
              </Button>
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
          <View style={{ flex: 0.8, paddingTop: 5 }}>
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
    flexDirection: 'column',
    paddingVertical: 8,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: '#ddd',
    position: 'relative',
  },
  itemStyle: {
    paddingLeft: 20,
    paddingRight: 30,
    flexDirection: 'row',
  },
  shareStyle: {
    paddingRight: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  topStyle: {
    //paddingHorizontal: 10,
  }
};


export default SplitBill;
