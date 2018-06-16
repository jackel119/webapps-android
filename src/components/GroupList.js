import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import GroupDetails from './GroupDetails';

class GroupList extends Component {
  state = {
    groupList: [
      { gid: 1, 
        groupName: 'Group1', 
        members: [
          { uid: 11, firstName: 'member', lastName: 'A', email: 'email' },
          { uid: 12, firstName: 'member', lastName: 'B', email: 'email' },
          { uid: 13, firstName: 'member', lastName: 'C', email: 'email' },
          { uid: 14, firstName: 'member', lastName: 'D', email: 'email' }] },
      { gid: 2, 
        groupName: 'Group2', 
        members: [
          { uid: 11, firstName: 'member', lastName: 'A', email: 'email' },
          { uid: 12, firstName: 'member', lastName: 'B', email: 'email' },
          { uid: 13, firstName: 'member', lastName: 'C', email: 'email' },
          { uid: 14, firstName: 'member', lastName: 'D', email: 'email' }] },
      { gid: 3, 
        groupName: 'Group3', 
        members: [
          { uid: 11, firstName: 'member', lastName: 'A', email: 'email' },
          { uid: 12, firstName: 'member', lastName: 'B', email: 'email' },
          { uid: 13, firstName: 'member', lastName: 'C', email: 'email' },
          { uid: 14, firstName: 'member', lastName: 'D', email: 'email' }] },
      { gid: 4, 
        groupName: 'Group4', 
        members: [
          { uid: 11, firstName: 'member', lastName: 'A', email: 'email' },
          { uid: 12, firstName: 'member', lastName: 'B', email: 'email' },
          { uid: 13, firstName: 'member', lastName: 'C', email: 'email' }] },
      { gid: 5, 
        groupName: 'Group5', 
        members: [
          { uid: 11, firstName: 'member', lastName: 'A', email: 'email' },
          { uid: 12, firstName: 'member', lastName: 'B', email: 'email' },
          { uid: 13, firstName: 'member', lastName: 'C', email: 'email' }] },
      { gid: 6, 
        groupName: 'Group6', 
        members: [
          { uid: 11, firstName: 'member', lastName: 'A', email: 'email' },
          { uid: 12, firstName: 'member', lastName: 'B', email: 'email' },
          { uid: 13, firstName: 'member', lastName: 'C', email: 'email' }] }
    ]
  };

  renderGroups() {
    return this.state.groupList.map(group =>
      <GroupDetails key={group.gid} group={group} />
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderGroups()}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    // backgroundColor: '#000a29'
  },
};

export default GroupList;
