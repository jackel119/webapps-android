import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import FriendDetails from './FriendDetails';
import Storages from './../actions/Storages';

const Global = require('./../Global');

class FriendsList extends Component {
  state = { friendsList: [] };

  componentWillMount() {
    Storages.get(Global.EMAIL).then(result => {
      this.setState({ friendsList: result.friends });
    });
  }

  renderFriends() {
    return this.state.friendsList.map(friend =>
      <FriendDetails key={friend.email} friend={friend} />
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
    paddingHorizontal: 5,
    flex: 1,
  },
};

export default FriendsList;
