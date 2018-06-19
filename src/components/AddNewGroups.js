import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { socket } from '../Global';
import Storages from './../actions/Storages';

const Global = require('./../Global');

class AddNewGroups extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      selectedFriends: [],
      groupName: ''
    };
    Storages.get(Global.EMAIL).then(res => {
      let result = [];
      this.setState({ groups: res.groups });
      for (var friend of res.friends) {
        result.push({
          id: friend.email,
          name: friend.first_name
        });
      }
      console.log(res);
      this.setState({ friends: result });
    });
  }

  onSelectedItemsChange(selected) {
    this.setState({ selectedPeople: selected });
  }

  onAdd() {
    console.log(this.state);
    let result = {};
    result.name = this.state.groupName;
    result.members = this.state.selectedPeople;
    result.members.push(Global.EMAIL);
    console.log(result);
    socket.emit('createNewGroup', result);
    socket.on('createGroupSuccess', res => console.log(res));
    socket.emit('getGroupsAndUsers');
    socket.on('allGroupsAndUsers', groups => {
      console.log('groups', groups);
      Storages.set(Global.EMAIL, { groups: groups });
    });
  }

  render() {
    const { selectedPeople } = this.state;
    return (
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
          <View style={styles.searchStyle}>
            <Icon name="search" size={20} style={[styles.iconStyle, { flex: 1 }]} />
            <TextInput
              placeholder="Group name"
              style={styles.inputStyle}
              value={this.state.groupName}
              onChangeText={res => this.setState({ groupName: res })}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButtonStyle}
              onPress={this.onAdd.bind(this)}
            >
              <Icon name="plus" size={20} style={[styles.iconStyle, { paddingRight: 10 }]} />
              <Text style={styles.submitTextStyle}>Create Group</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 10
  },
  iconStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
  containerStyle: {
    marginVertical: 10,
    paddingHorizontal: 20,
    flex: 1
  },
  searchStyle: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  submitButtonStyle: {
    marginHorizontal: 5,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'yellowgreen',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  submitTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
};

export default AddNewGroups;
