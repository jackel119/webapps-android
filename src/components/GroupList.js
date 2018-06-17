import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import GroupDetails from './GroupDetails';
import Storages from './../actions/Storages';

const Global = require('./../Global');

class GroupList extends Component {
  state = {
    groupList: []
  };

  componentWillMount() {
    Storages.get(Global.EMAIL).then(result => {
      console.log('result', result);
      this.setState({ groupList: result.groups });
    });
  }

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
