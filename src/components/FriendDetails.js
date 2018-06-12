import React from 'react';
import { Text, View } from 'react-native';

const FriendDetail = ({ friend }) => {
  const { email, name } = friend;
  const { cardStyle, amountStyle, timeStyle, descriptionStyle, rightStyle, leftStyle } = styles;
  return (
    <View style={cardStyle}>
      <View style={leftStyle}>
          <Text style={amountStyle}>{name} </Text>
      </View>


      <View style={rightStyle}>
          <Text style={timeStyle}>group?</Text>
          <Text style={descriptionStyle}>{email}</Text>
      </View>
    </View>
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
    backgroundColor: '#000a29'
  },
  leftStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rightStyle: {
    flex: 1,
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
    marginBottom: 5,
  },
  descriptionStyle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'right',
    fontFamily: 'TitilliumWeb-Regular',
  }
};

export default FriendDetail;
