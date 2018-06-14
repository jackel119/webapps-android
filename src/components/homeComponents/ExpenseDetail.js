import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Storages from './../../actions/Storages';

const Global = require('./../../Global');

class ExpenseDetail extends Component {

  render() {
    const { amount, time, description} = this.props.expense;
    const { cardStyle, amountStyle, timeStyle, descriptionStyle, rightStyle, leftStyle } = styles;

    return (
      <View style={cardStyle}>
        <View style={leftStyle}>
            <Text style={amountStyle}>£ {amount} </Text>
        </View>

        <View style={rightStyle}>
            <Text style={timeStyle}>{time}</Text>
            <Text style={timeStyle}>{description}</Text>
            <Text style={descriptionStyle}>shareWith</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 0.4,
    borderColor: 'white',
    backgroundColor: '#000a29'
  },
  leftStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rightStyle: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  amountStyle: {
    color: 'white',
    textAlign: 'left',
    fontSize: 24,
  },
  timeStyle: {
    color: 'white',
    textAlign: 'right',
    fontSize: 12,
  },
  descriptionStyle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'right',
    fontFamily: 'TitilliumWeb-Regular',
  }
};

export default ExpenseDetail;
