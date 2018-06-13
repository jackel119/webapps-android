import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SplitBill extends Component {

  constructor(props) {
    super(props);

    console.log(this.props.data);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Enter Success</Text>
      </View>
    );
  }
}

export default SplitBill;

