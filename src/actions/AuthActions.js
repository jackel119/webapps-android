import { Actions } from 'react-native-router-flux';
import { socket } from '../Global';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types';
import Storages from './Storages';

const Global = require('./../Global');

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export function loginUser({ email, password }) {
  return (dispatch) => {
    socket.emit('authentication', { username: email, password });
    socket.on('authResult', res => {
      if (res.result) {
        Global.UID = res.data.uid;
        const uid = Global.UID;

        // TODO: Storages.set(uid, { userData: res.data, trans: [] || [], friends: [] });

        socket.emit('requestTXs');
        socket.on('allTransactions', txs => {
          // Storages.set(uid, { userData: res.data, trans: txs, friends: [] });
          // Storages.get(uid).then(r => console.log(r));
          // TODO: Storages.setTransaction();

          let uidList = [];
          let friendList = [];

          //Add friends:
          for (const tx of txs) {
            if (tx.from_user !== res.data.uid) {
              uidList = uidList.concat(tx.from_user);
            } else if (tx.to_user !== res.data.uid) {
              uidList = uidList.concat(tx.to_user);
            }
          }
          const newList = [...new Set(uidList.filter(x => x))];//remove null

          socket.emit('getUsersByUID', newList);
          socket.on('users', res2 => {
            let newFriend = {};
            for (const friendUID of newList) {
              newFriend = {
                uid: friendUID,
                name: res2[friendUID].first_name,
                email: res2[friendUID].email
              };
              if (!friendList.includes(newFriend)) {
                friendList = friendList.concat(newFriend);
              }
            }
            // TODO: Storages.setFriendList();
            Storages.set(uid, { userData: res.data, trans: txs, friends: friendList });
            // Storages.get(uid).then(re => console.log(re));
          });
        });

        loginUserSucess(dispatch, { email, password });
      } else {
        loginUserFail(dispatch);
      }
    });
    dispatch({ type: LOGIN_USER });
  };
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSucess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  Actions.homepage();
};
