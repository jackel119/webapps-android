import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

const TransactionDetails = ({ transaction }) => {
  const { amount, time, description, shareWith, billDetails } = transaction;
  const { cardStyle, amountStyle, timeStyle, descriptionStyle, rightStyle, leftStyle } = styles;

  return (
    <TouchableOpacity 
      onPress={() => Actions.billDetails({ billDetails })}
      style={cardStyle}
    >
      <View style={leftStyle}>
          <Text style={amountStyle}>{amount[0]} £ {parseFloat(amount.substring(1)).toFixed(2)} </Text>
      </View>

      <View style={rightStyle}>
          <Text style={timeStyle}>{time}</Text>
          <Text style={timeStyle}>{description}</Text>
          <Text style={descriptionStyle}>{shareWith}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  cardStyle: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    height: 70,
    borderBottomWidth: 0.4,
    borderColor: 'white',
    backgroundColor: '#0a0809'
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

export default TransactionDetails;
