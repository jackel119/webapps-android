import React from 'react';
import { Text, View } from 'react-native';

const FriendDetail = ({ friend }) => {
  const { email, firstName, lastName } = friend;
  const { cardStyle, nameStyle, groupStyle, emailStyle, rightStyle, leftStyle } = styles;
  return (
    <View style={cardStyle}>
      <View style={leftStyle}>
          <Text style={nameStyle}>{firstName} {lastName} </Text>
      </View>


      <View style={rightStyle}>
          <Text style={groupStyle}>group?</Text>
          <Text style={emailStyle}>{email}</Text>
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
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  nameStyle: {
    color: 'white',
    textAlign: 'left',
    fontSize: 18,
  },
  groupStyle: {
    color: 'white',
    textAlign: 'right',
    fontSize: 12,
    marginBottom: 5,
  },
  emailStyle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'TitilliumWeb-Regular',
  }
};

export default FriendDetail;
