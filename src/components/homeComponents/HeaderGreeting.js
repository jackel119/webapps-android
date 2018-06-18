import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Storages from './../../actions/Storages';

const Global = require('./../../Global');

class HeaderGreeting extends Component {

  state = {
    username: 'User',
    modalVisible: false,
    totalAmount: 0,
  };

  componentWillMount() {
    const email = Global.EMAIL;
    Storages.getTotalAmount(email).then(totalAmount => {
      this.setState({ totalAmount });
    });

    Storages.getUsername(email).then(username => {
      this.setState({ username });
    });
    Storages.get(email).then(result => {
      this.setState({ username: result.userData.first_name });
    });
  }

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    const { greetingStyle, blankStyle, usernameStyle, spentStyle,
      containerStyle, white, iconContainerStyle } = styles;

    return (
      <View>
        <View style={containerStyle}>
          <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: -20 }}
          >
            <Icon
              name="menu"
              size={20}
              color='white'
              iconStyle={{ marginRight: 0 }}
              onPress={() => { Actions.drawerOpen(); }}
            />
            <Icon.Button
              name="add"
              size={40}
              borderRadius={100}
              color='white'
              onPress={() => this.setModalVisible()}
              backgroundColor={'#f9ba32'}
              iconStyle={{ marginRight: 0 }}
            />
          </View>
          <Text style={greetingStyle}> Hello, </Text>
          <Text style={usernameStyle}>{this.state.username}.</Text>
          <View style={blankStyle} />
          <Text style={white}>You have spent</Text>
          <Text style={spentStyle}>{this.state.totalAmount}</Text>
          <Text style={white}>this week.</Text>
        </View>

        <Modal
          isVisible={this.state.modalVisible}
          backdropOpacity={0.5}
          onBackdropPress={() => this.setModalVisible()}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={iconContainerStyle}>
              <Icon.Button
                name="camera-alt"
                size={50}
                color='white'
                borderRadius={100}
                onPress={() => {
                  this.setModalVisible();
                  Actions.camera();
                }}
                iconStyle={{ marginRight: 0 }}
              />
            </View>

            <View style={iconContainerStyle}>
              <Icon.Button
                name="edit"
                size={50}
                color='white'
                borderRadius={100}
                onPress={() => {
                  this.setModalVisible();
                  Actions.addBill();
                }}
                iconStyle={{ marginRight: 0 }}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  white: {
    fontFamily: 'AlegreyaSansSC-Regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'right',
    marginBottom: -10,
    marginTop: -10,
  },

  containerStyle: {
    height: 300,
    paddingTop: 20,
    paddingHorizontal: 20
  },

  blankStyle: {
    height: 60
  },

  greetingStyle: {
    fontFamily: 'Drugs',
    fontSize: 34,
    textAlign: 'left',
    color: 'white',
    opacity: 0.9
  },

  usernameStyle: {
    fontFamily: 'AlegreyaSansSC-Regular',
    fontSize: 30,
    textAlign: 'right',
    right: 40,
    color: 'white',
    opacity: 0.9
  },

  spentStyle: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white',
    opacity: 0.9
  },

  iconContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  },

  toplineStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
};

export { HeaderGreeting };
