import React, { Component} from 'react';
import { Text, View, ScrollView } from 'react-native';
import FriendDetails from './FriendDetails';

class GroupDetail extends Component {

  renderMembers() {
    return this.props.group.members.map(friend =>
      <FriendDetails key={friend.uid} friend={friend} />);
  }

  render() {
    const { groupName, members } = this.props.group;
    const { cardStyle, nameStyle, groupStyle, emailStyle, rightStyle, leftStyle } = styles;
    return (
      <View style={cardStyle}>
        <View style={{}}>
            <Text style={nameStyle}>{groupName} </Text>
        </View>
        <ScrollView style={{ height: 100 }}>
          {this.renderMembers()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 20,
    height: 140,
    borderBottomWidth: 0.4,
    borderColor: 'white',
    backgroundColor: '#0a0809',
    flexDirection: 'column'
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

export default GroupDetail;
