import React from 'react';
import { Text, View } from 'react-native';

const FriendDetail = ({ friend }) => {
  const { email, first_name, last_name } = friend;
  const { cardStyle, nameStyle, emailStyle, topStyle, bottomStyle } = styles;
  return (
    <View style={cardStyle}>
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <View style={{ borderRadius: 100, height: 40, width: 40, backgroundColor: 'greenyellow' }}/>
      </View>
      <View style={{ flex: 3 }}>
        <View style={topStyle}>
            <Text style={nameStyle}>{first_name} {last_name} </Text>
        </View>
        <View style={bottomStyle}>
            <Text style={emailStyle}>{email}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  cardStyle: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    flexDirection: 'row',
    marginBottom: 2,
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

export default FriendDetail;
