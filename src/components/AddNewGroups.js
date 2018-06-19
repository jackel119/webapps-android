import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from './common';
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
          <View styke={{ flex: 0.1 }}>
            <TextInput
              placeholder="Group Name"
              style={styles.inputStyle}
              value={this.state.groupName}
              onChangeText={res => this.setState({ groupName: res })}
            />
          </View>
          <View style={{ flex: 0.1 }}>
            <Button
              onPress={this.onAdd.bind(this)}
            >
              <Text>Add Group</Text>
            </Button>
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
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default AddNewGroups;
