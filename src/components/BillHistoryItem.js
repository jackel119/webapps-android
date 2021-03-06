import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableOpacity } from 'react-native';

const BillHistoryItem = ({ bill }) => {
  const { payeeName, billDate, description, totalPrice } = bill;
  const { cardStyle, amountStyle, timeStyle, descriptionStyle, rightStyle, leftStyle } = styles;

  return (
    <TouchableOpacity 
      onPress={() => Actions.billDetails({ billDetails: bill })}
      style={cardStyle}
    >
      <View style={leftStyle}>
          <Text style={amountStyle}>{description}</Text>
      </View>
      <View style={rightStyle}>
          <Text style={timeStyle}>{billDate}</Text>
          <Text style={timeStyle}>payee: {payeeName}</Text>
          <Text style={descriptionStyle}>totalPrice: £ {parseFloat(totalPrice).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
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

export default BillHistoryItem;
