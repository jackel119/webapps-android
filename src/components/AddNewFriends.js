import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Storages from './../actions/Storages';
import { socket } from '../Global';

const Global = require('./../Global');

class AddNewFriends extends Component {

  componentWillMount() {
    this.state = {
      email: ''
    };
  }

  add() {
    console.log(this.state.email);
    socket.emit('addFriend', this.state.email);
    socket.emit('getFriends');
    socket.on('friends', friends => {
      console.log('friends', friends);
      Storages.set(Global.EMAIL, { friends });
    });
  }

  render() {
    const { inputStyle, iconStyle, containerStyle,
      searchStyle, submitButtonStyle, submitTextStyle } = styles;
    return (
      <View style={containerStyle}>
        <View style={searchStyle}>
          <Icon name="search" size={20} style={iconStyle} />
          <TextInput
            placeholder="friend's email"
            style={inputStyle}
            value={this.state.email}
            onChangeText={res => this.setState({ email: res })}
          />
        </View>
        <TouchableOpacity style={submitButtonStyle} onPress={this.add.bind(this)}>
          <Text style={submitTextStyle}>Send Request</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingHorizontal: 5,
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

export default AddNewFriends;
