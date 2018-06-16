import React from 'react';
import { Text, View } from 'react-native';

const FriendDetail = ({ friend }) => {
  const { email, first_name, last_name } = friend;
  const { cardStyle, nameStyle, emailStyle, rightStyle, leftStyle } = styles;
  return (
    <View style={cardStyle}>
      <View style={leftStyle}>
          <Text style={nameStyle}>{first_name} {last_name} </Text>
      </View>


      <View style={rightStyle}>
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
    height: 60,
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
  emailStyle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'TitilliumWeb-Regular',
  }
};

export default FriendDetail;
