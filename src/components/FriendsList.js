import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import FriendDetails from './FriendDetails';
import Storages from './../actions/Storages';

class FriendsList extends Component {
  state = { friendsList: [
    { uid: 1, name: 'david', email: '2@test.com' },
    { uid: 2, name: 'avid', email: '2@est.com' },
    { uid: 3, name: 'vid', email: '2@st.com' }
  ] };

  componnetWillMount() {
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
