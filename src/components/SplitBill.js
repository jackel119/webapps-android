import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import { CardSection } from './common';

class SplitBill extends Component {

  constructor(props) {
    super(props);

    console.log(this.props.data);
  }


  render() {
    let renderData = this.props.data.map((data) => {
    return (
        <CardSection>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text> {'Item ' + data.id} </Text>
              <Text> Amount </Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text> {data.name} </Text>
              <Text> {data.amount} </Text>
            </View>
          </View>
        </CardSection>
      );
    });
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          {this.renderTop()}
        </View>
        <View style={{ flex: 0.9 }}>
          <ScrollView>
            {renderData}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default SplitBill;

