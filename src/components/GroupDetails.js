import React, { Component} from 'react';
import { Text, View, ScrollView } from 'react-native';
import FriendinGroup from './FriendinGroup';

class GroupDetail extends Component {

  renderMembers() {
    return this.props.group.members.map(friend =>
      <FriendinGroup key={friend.uid} friend={friend} />);
  }

  render() {
    const { gname, members } = this.props.group;
    const { cardStyle, nameStyle } = styles;
    return (
      <View style={cardStyle}>
        <View style={{}}>
            <Text style={nameStyle}>{gname} </Text>
        </View>
        <ScrollView style={{ height: 140 }}>
          {this.renderMembers()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  cardStyle: {
    marginBottom: 2,
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
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
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    //paddingBottom: 5,
    marginBottom: 10,
  },
};

export default GroupDetail;
