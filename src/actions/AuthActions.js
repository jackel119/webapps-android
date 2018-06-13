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

export const loginUser = ({ email, password }) => {
  // an arbitrary sample
  Storages.set('uid', { userData: 'userInfo', trans: 'txs', friends: 'friendList' });
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    socket.emit('authentication', { username: email, password });
    socket.on('authResult', res => {
      if (res.result) {
        Global.UID = res.data.uid;
        const uid = Global.UID;
        console.log('1.uid is: ' + uid);

        socket.emit('requestTXs');
        socket.on('allTransactions', txs => {
          //Storages.clearAll();
          //Storages.delete(uid); //clear records, assuming it's the first time to login
          Storages.getAllKeys().then((result) => console.log('0.have keys: ' + result));

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
          const newList = [...new Set(uidList)];

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
            console.log(friendList);
            Storages.set(uid, { userData: res.data, trans: txs, friends: friendList });
          });

         // Storages.set(uid, { userData: res.data, trans: txs, friends: friendList });
          Storages.get(uid).then(res1 => console.log(res1));


          // for checking
          Storages.getAllKeys().then((result) => {
            if (result.indexOf(uid) < 0) {
              // console.log('uid is: ' + uid);
              // console.log('TXs is: ' + txs);
 // login for the first time: store TXs with uid as key
              console.log('1.have keys: ' + result)
            } else {
              // TODO: has logged in before
              //Storages.update(uid, txs);
              console.log('2.have keys: ' + result)
            }
          });

          //Storages.get(uid).then((result) => console.log(result));
        });
        loginUserSucess(dispatch, { email, password });
      } else {
        loginUserFail(dispatch);
      }
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSucess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  Actions.homepage();
};
