import React from 'react';
import { Text, View } from 'react-native';

const FriendinGroup = ({ friend }) => {
  const { email, first_name, last_name } = friend;
  const { cardStyle, nameStyle, emailStyle, topStyle, bottomStyle } = styles;
  return (
    <View style={cardStyle}>
      <View style={topStyle}>
          <Text style={nameStyle}>{first_name} {last_name} </Text>
      </View>


      <View style={bottomStyle}>
          <Text style={emailStyle}>{email}</Text>
      </View>
    </View>
  );
};

const styles = {
  cardStyle: {
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 8,
    paddingHorizontal: 20,
    height: 70,
    borderBottomWidth: 1,
    borderColor: 'white',
    backgroundColor: '#ededed'
  },
  topStyle: {
    flex: 1,
  },
  bottomStyle: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  nameStyle: {
    textAlign: 'left',
    fontSize: 17,
  },
  emailStyle: {
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'TitilliumWeb-Regular',
  }
};

export default FriendinGroup;
