import React from 'react';
import { Text, View } from 'react-native';

const ExpensePageDetail = ({ expense }) => {
  const { amount, time, description, shareWith } = expense;
  const { cardStyle, amountStyle, timeStyle, descriptionStyle, rightStyle, leftStyle } = styles;

  return (
    <View style={cardStyle}>
      <View style={leftStyle}>
          <Text style={amountStyle}>£ {amount} </Text>
      </View>
      <View style={rightStyle}>
          <Text style={timeStyle}>{time}</Text>
          <Text style={timeStyle}>{description}</Text>
          <Text style={descriptionStyle}>{shareWith}</Text>
      </View>
    </View>
  );
};

const styles = {
  cardStyle: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    height: 70,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 2,
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
    textAlign: 'left',
    fontSize: 24,
  },
  timeStyle: {
    textAlign: 'right',
    fontSize: 12,
  },
  descriptionStyle: {
    fontSize: 18,
    textAlign: 'right',
    fontFamily: 'TitilliumWeb-Regular',
  }
};

export default ExpensePageDetail;
