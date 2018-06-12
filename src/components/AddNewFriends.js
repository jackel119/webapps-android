import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

class AddNewFriends extends Component {
  render() {
    const { inputStyle, iconStyle, containerStyle } = styles;
    return (
      <View style={{ flex: 1 }}>
        <View style={containerStyle}>
          <TextInput
            placeholder="Add New Friends"
            style={inputStyle}
          />
        </View>

        <View style={{ flex: 10, borderTopWidth: 0.6 }}>
          <Text>Friend Reqests</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  iconStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 4
  },
  labelStyle: {
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
