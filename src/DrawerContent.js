import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Storages from './actions/Storages';

const Global = require('./Global');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  barStyle: {
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row'
  },

  barStyleActive: {
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f9ba32',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row'
  },

  profileStyle: {
    height: 90,
    width: 300,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },

  textStyle: {
    position: 'absolute',
    left: 60,
    fontSize: 18,
  },

  iconStyle: {
    position: 'absolute',
    right: 250,
    fontSize: 20,
  },

  nameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  fullnameStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
});

class DrawerContent extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  }

  static contextTypes = {
    drawer: PropTypes.object,
  }

  state = {
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email@example.com'
  };

  componentWillMount() {
    Storages.get(Global.EMAIL).then(res => {
      this.setState({ firstname: res.userData.first_name });
      this.setState({ lastname: res.userData.last_name });
      this.setState({ email: res.userData.email });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileStyle}>
          <View style={styles.fullnameStyle}>
            <Text style={styles.nameStyle}>{this.state.firstname} </Text>
            <Text style={styles.nameStyle}>{this.state.lastname}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', paddingTop: 10 }}>
            <Text>{this.state.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={Actions.currentScene === 'homepage' ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.homepage}
        >
          <Icon name="home" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(Actions.currentScene === 'addBill'
          || Actions.currentScene === 'split'
          || Actions.currentScene === 'camera'
          || Actions.currentScene === 'imageDisplay') ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.addBill}
        >
          <Icon name="plus" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Add Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Actions.currentScene === 'expensePage' ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.expensePage}
        >
          <Icon name="list-alt" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(Actions.currentScene === 'friendList' || Actions.currentScene === 'addFriend') ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.friendList}
        >
          <Icon name="user" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Actions.currentScene === 'groupList' ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.groupList}
        >
          <Icon name="users" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Actions.currentScene === 'setting' ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.setting}
        >
          <Icon name="cog" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Setting</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

export default DrawerContent;
