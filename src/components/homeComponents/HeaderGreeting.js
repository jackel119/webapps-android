import React, { Component } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

class HeaderGreeting extends Component {

  state = {
    modalVisible: false,
  };

  setModalVisible() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  render() {
    const { greetingStyle, blankStyle, usernameStyle, spentStyle, imageStyle,
      containerStyle, white, iconContainerStyle } = styles;

    return (
      <ImageBackground
      source={require('../Img/header1.jpg')}
      style={imageStyle}
      >
        <View>

          <View style={containerStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Icon
                name="menu" 
                size={20} 
                color='white' 
                iconStyle={{ marginRight: 0 }}
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
            <Text style={greetingStyle}>Good Morning,</Text>
            <Text style={usernameStyle}>Jack.</Text>
            <View style={blankStyle} />
            <Text style={white}>You have spent</Text>
            <Text style={spentStyle}>£12345.67</Text>
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
                    Actions.addTransaction();
                  }} 
                  iconStyle={{ marginRight: 0 }}

                />
              </View>
            </View>
          </Modal>
        </View>
      </ImageBackground>
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
    marginTop: 30,
    paddingHorizontal: 20
  },

  blankStyle: {
    height: 45
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

  imageStyle: {
    backgroundColor: '#2a363b',
    justifyContent: 'center',
    alignContent: 'space-between',
    height: 300,
    width: null //to make sure the img spread across the page
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
