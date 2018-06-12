import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  barStyle1: {
    height: 50,
    width: 300,
    alignItems: 'center',
    paddingHorizontal: 30,
    //justifyContent: 'center',
    backgroundColor: 'lightblue',
    flexDirection: 'row'
  },

  barStyle2: {
    height: 50,
    width: 300,
    alignItems: 'center',
    paddingHorizontal: 30,
    //justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row'
  },

  textStyle: {
    //fontWeight: 'bold',
    flex: 1,
    fontSize: 18,
  },

  iconStyle: {
    fontSize: 20,
    paddingRight: 10,
    //flex: 1
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

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.barStyle1} onPress={Actions.homepage}>
          <Icon name="home" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barStyle2} onPress={Actions.addTransaction}>
          <Icon name="plus" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Add Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barStyle1} onPress={Actions.expensePage}>
          <Icon name="list-alt" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barStyle2} onPress={Actions.friendsList}>
          <Icon name="users" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Friends List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barStyle1} onPress={Actions.setting}>
          <Icon name="cog" size={20} style={styles.iconStyle} />
          <Text style={styles.textStyle}>Setting</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

export default DrawerContent;
