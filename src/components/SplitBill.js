import React, { Component } from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import MultiSelect from 'react-native-multiple-select';
import { Actions } from 'react-native-router-flux';
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
      splitted: false,
      submitVisible: false
    };

    console.log(this.props);
    console.log(this.props.items);
    console.log(this.props.items.length);
    console.log(this.props.items[0]);

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
    for (i = 0; i < this.props.items.length; i++) {
      this.setModalVisibility(i, false);
      this.state.total += parseFloat(this.state.items[i].price);
      console.log('PRINTING AMOUNT', this.state.total);
    }
  }

  onSelectedItemsChange(selectedPeople) {
    var peopleInvolved = [];
    var groupsInvolved = [];
    for (var selected of selectedPeople) {
      var id = this.state.friends.findIndex((obj => obj.id === selected));
      if (id !== -1 && this.state.friends[id].isGroup) {
        for (var group of this.state.groups) {
          if (group.gid === selected) {
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
          splitAmount: (this.state.items[i].price / (peopleInvolved.length))
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
      var id = this.state.friends.findIndex((obj => obj.id === selected));
      if (id !== -1 && this.state.friends[id].isGroup) {
        for (var group of this.state.groups) {
          if (group.gid === selected) {
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
        splitAmount: (this.state.items[index].price / (peopleInvolved.length))
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
        var objIndex = people.findIndex((obj => obj.user === res.user));
        if (objIndex === -1) {
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
    if (!result.users.includes(Global.EMAIL)) {
      result.users.push(Global.EMAIL);
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
    if (this.props.billDate === undefined || this.props.billDate == '') {
      result.billDate = new Date().toLocaleDateString("en-GB");
    } else {
      result.billDate = this.props.billDate;
    }

    console.log('client sent: ', result);
    socket.emit('addBill', result);
    socket.on('newBill', async data => {
      console.log('backend sent: ', data);
      this.setState({ submitVisible: true });
      for (const item of data.bdata.items) {
        for (var spliter1 of item.split) {
          if (spliter1.user === Global.EMAIL) {
            spliter1.user = { email: Global.EMAIL, first_name: 'Me', last_name: '' };
          } else {
            await Storages.getFriendByEmail(Global.EMAIL, spliter1.user)
              .then(friend => {
                spliter1.user = friend;
              });
          }
        }
      }
      data.bdata.payeeName = 'Me';
      var transactionBillMap = [];
      for (const spliter of data.bdata.split) {
        console.log('spliter', spliter);
        var transaction = {}; 
        var myfriend = null; 
        if (spliter.user !== Global.EMAIL) {
          console.log(spliter);
          await Storages.getFriendByEmail(Global.EMAIL, spliter.user)
            .then(friend => myfriend = friend);
          spliter.user = myfriend;
          transaction = {
            fromEmail: Global.EMAIL, 
            toEmail: myfriend.email,
            toFirstName: myfriend.first_name,
            toLastName: myfriend.last_name,
            amount: '+' + spliter.splitAmount,
            time : data.bdata.billDate,
            description: data.bdata.description,
            shareWith: 'Paid for ' + myfriend.first_name,
            billDetails: data.bdata
          };
        } else {
          spliter.user = { email: Global.EMAIL, first_name: 'Me', last_name: '' };
          transaction = {
            fromEmail: Global.EMAIL, 
            toEmail: Global.EMAIL,
            amount: ' ' + spliter.splitAmount,
            time: data.bdata.billDate,
            description: data.bdata.description,
            shareWith: 'Paid for myself',
            billDetails: data.bdata
          };
        }
        transactionBillMap.push(transaction);
      }
      console.log('transactionBillMap', transactionBillMap);
      await Storages.addTransactionBill(Global.EMAIL, transactionBillMap);
      await Storages.addBill(Global.EMAIL, data);
    });
  }

  renderselect() {
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
              <TouchableOpacity
                style={styles.topButtonStyle}
                onPress={() => this.setState({ modalVisible: false, splitted: true })}
              >
                <Text style={styles.topTextStyle}>Complete Split</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
      );
    }
  }

  renderTop() {
    console.log(this.state);
    if (this.state.splitted) {
      return (
        <View>
          <TouchableOpacity
            style={styles.topButtonStyle}
            onPress={() => {
              this.setState({ splitEqually: true, modalVisible: true, splitted: false });
            }}
          >
            <Text style={styles.topTextStyle}>Modify Split</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            style={styles.topButtonStyle}
            onPress={() => { this.setState({ splitEqually: true, modalVisible: true }); }}
          >
            <Text style={styles.topTextStyle}>Split Equally?</Text>
          </TouchableOpacity>
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

  homepageNav() {
    Actions.homepage();
  }

  billNav() {
    Actions.addBill();
  }

  renderSubmit() {
    if (this.state.submitVisible) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.submitButtonStyle, { backgroundColor: 'yellowgreen' }]}
              onPress={this.homepageNav.bind(this)}
            >
              <Text style={styles.submitTextStyle}>Back to Homepage</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.submitButtonStyle, { backgroundColor: 'yellowgreen' }]}
              onPress={this.billNav.bind(this)}
            >
              <Text style={styles.submitTextStyle}>Add another Bill</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            style={[styles.submitButtonStyle, { backgroundColor: 'sandybrown' }]}
            onPress={this.submitPress.bind(this)}
          >
            <Text style={styles.submitTextStyle}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    if (this.state.items.length === 0) {
      this.state.items.push({
        id: 1,
        name: this.props.description,
        price: this.props.total
      });
      this.state.total = this.props.total;
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
                <TouchableOpacity
                  style={styles.topButtonStyle}
                  onPress={() => this.setModalVisibility(data.id - 1, false)}
                >
                  <Text style={styles.topTextStyle}>Complete Split</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    });

    return (
      <View style={{ flex: 1 }}>
        <View>{this.renderselect()}</View>
        <View style={{ flex: 0.85 }}>
          <View style={{ paddingTop: 5 }}>
            {this.renderTop()}
          </View>
          <View style={styles.containerStyle}>
            <ScrollView>
              {renderData}
            </ScrollView>
          </View>
        </View>
        <View style={{ flex: 0.15, justifyContent: 'flex-end' }}>
          {this.renderSubmit()}
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
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingBottom: 5,
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
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'lightblue',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  submitButtonStyle: {
    marginHorizontal: 5,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  submitTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  topButtonStyle: {
    marginHorizontal: 5,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'khaki',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  topTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
};

export default SplitBill;
