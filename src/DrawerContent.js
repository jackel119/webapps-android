import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
        <Text onPress={Actions.homepage}>Home</Text>
        <Text onPress={Actions.addTransaction}>Add Transaction</Text>
        <Text>Transaction History</Text>
        <Text onPress={Actions.setting}>Setting</Text>
      </View >
    );
  }
}

export default DrawerContent;
