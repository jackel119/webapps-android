import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, TouchableOpacity, Image } from 'react-native';
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  userIconStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  }
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
          <View style={{ flex: 1 }}>
            <View style={styles.userIconStyle}>
              <Image
                style={{ borderRadius: 100, height: 50, width: 50 }}
                source={require('./components/Img/myicon.jpg')}
              />
            </View>
          </View>
          <View style={{ flex: 3 }}>
            <View style={styles.fullnameStyle}>
              <Text style={styles.nameStyle}>{this.state.firstname} </Text>
              <Text style={styles.nameStyle}>{this.state.lastname}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', paddingTop: 10 }}>
              <Text>{this.state.email}</Text>
            </View>
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
          || Actions.currentScene === 'cameraRoll'
          || Actions.currentScene === 'imageDisplay') ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.addBill}
        >
          <Icon name="plus" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Add Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Actions.currentScene === 'transactionHistory' ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.transactionHistory}
        >
          <Icon name="exchange" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Transaction History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(Actions.currentScene === 'billHistory'
          || Actions.currentScene === 'billDetails') ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.billHistory}
        >
          <Icon name="list-alt" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Bill History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(Actions.currentScene === 'friendList'
          || Actions.currentScene === 'addFriend') ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.friendList}
        >
          <Icon name="user" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={(Actions.currentScene === 'groupList' || Actions.currentScene === 'addGroup') ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.groupList}
        >
          <Icon name="users" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Groups</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Actions.currentScene === 'Graphs' ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.graph}
        >
          <Icon name="line-chart" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Graph</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Actions.currentScene === 'setting' ?
            styles.barStyleActive : styles.barStyle}
          onPress={Actions.setting}
        >
          <Icon name="cog" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.barStyle}
          onPress={Actions.login}
        >
          <Icon name="sign-out" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Log Out</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

export default DrawerContent;
