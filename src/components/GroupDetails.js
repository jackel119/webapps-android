import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FriendinGroup from './FriendinGroup';

class GroupDetail extends Component {

  renderMembers() {
    return this.props.group.members.map(friend =>
      <FriendinGroup key={friend.email} friend={friend} />);
  }

  render() {
    const { gname } = this.props.group;
    const { cardStyle, nameStyle } = styles;
    return (
      <View style={cardStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={nameStyle}>{gname} </Text>
          <TouchableOpacity style={styles.editButtonStyle}>
            <Icon name="edit" size={20} style={styles.iconStyle} />
            <Text>edit</Text>
          </TouchableOpacity>
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
    marginBottom: 10,
  },
  iconStyle: {
    fontSize: 20,
    paddingRight: 5,
  },
  editButtonStyle: {
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 5,
    width: 80,
    height: 35,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: 'palegoldenrod',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
};

export default GroupDetail;
