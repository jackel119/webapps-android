import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import FriendDetails from './FriendDetails';
import Storages from './../actions/Storages';

const Global = require('./../Global');

class FriendsList extends Component {
  state = { friendsList: [] };

  componentWillMount() {
    console.log('get here???');
    const uid = Global.UID;
    Storages.get(uid).then(result => {
      this.setState({ friendsList: result.friends });
      //console.log(result.friends);
    });
  }

  renderFriends() {
    return this.state.friendsList.map(friend =>
      <FriendDetails key={friend.uid} friend={friend} />
    );
  }

  render() {
    console.log(this.state);
    return (
      <ScrollView style={styles.container}>
        {this.renderFriends()}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#000a29'
  },
};

export default FriendsList;
