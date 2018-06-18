import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from './common';
import { socket } from '../Global';

class AddNewFriends extends Component {

  componentWillMount() {
    this.state = {
      email: ''
    };
  }

  add() {
    console.log(this.state.email);
    socket.emit('addFriend', this.state.email);
  }

  render() {
    const { inputStyle, iconStyle, containerStyle } = styles;
    return (
      <View style={{ flex: 1 }}>
        <View style={containerStyle}>
          <Icon name="search" size={20} style={iconStyle} />
          <TextInput
            placeholder="email"
            style={inputStyle}
            value={this.state.email}
            onChangeText={res => this.setState({ email: res })}
          />
        </View>
        <Button onPress={this.add.bind(this)}>
          Send Request
        </Button>
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

export default AddNewFriends;
