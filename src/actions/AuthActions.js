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
  return async (dispatch) => {
    socket.emit('authentication', { username: email, password });
    await socket.on('authResult', res => {
      if (res.result) {
        Global.UID = res.data.uid;
        const uid = Global.UID;

        // Storages.set(uid, { userData: res.data, trans: [], friends: [] });
        Storages.get(uid).then(re => console.log(2, re));


        socket.emit('requestTXs');
        socket.on('allTransactions', txs => {
          // Storages.set(uid, { userData: res.data, trans: txs, friends: [] });
          // Storages.get(uid).then(r => console.log(r));
          // TODO: Storages.setTransaction();
          var friendList = [];
          var uidList = [];
          console.log(1, friendList);
          console.log(txs);

          //Add friends:
          for (const tx of txs) {
            const fromUser = tx.from_user;
            const toUser = tx.to_user;

            if (fromUser !== res.data.uid) {
              tx.amount = '-' + tx.amount;
              uidList.push(fromUser);
              socket.emit('getUsersByUID', [fromUser]);
              socket.on('users', friendDetails => {
                if (typeof friendDetails[fromUser] !== 'undefined') {
                  const newFriend = {
                    uid: fromUser,
                    email: friendDetails[fromUser].email,
                    firstName: friendDetails[fromUser].first_name,
                    lastName: friendDetails[fromUser].last_name
                  };
                  friendList.push(newFriend);
                  tx.shareWith = 'Paid by ' + newFriend.firstName;
                  Storages.addTX(uid, tx);
                }
              });
            } else if (tx.toUser !== res.data.uid) {
              tx.amount = '+' + tx.amount;
              uidList.push(toUser);
              socket.emit('getUsersByUID', [toUser]);
              socket.on('users', friendDetails => {
                if (typeof friendDetails[toUser] !== 'undefined') {
                  const newFriend = {
                    uid: toUser,
                    email: friendDetails[toUser].email,
                    firstName: friendDetails[toUser].first_name,
                    lastName: friendDetails[toUser].last_name
                  };
                  friendList.push(newFriend);
                  tx.shareWith = 'Paid for ' + newFriend.firstName;
                }
              });
            }
          }

          console.log(2, friendList);
          console.log(txs);
          setTimeout(function(){
            Storages.set(uid, { userData: res.data, trans: txs, friends: friendList });
            Storages.get(uid).then(re => console.log(1, re));
            loginUserSucess(dispatch, { email, password });
          }, 0);
        });
      } else {
        loginUserFail(dispatch);
      }
    });
    dispatch({ type: LOGIN_USER });
  };
}

// const renderNewFriend = (friend) => {
//   // var newFriend = {};
//   socket.emit('getUsersByUID', [friend]);
//   socket.on('users', async res2 => {
//     if (typeof res2[friend] !== 'undefined') {
//       const newFriend = await {
//         uid: friend,
//         email: res2[friend].email,
//         firstName: res2[friend].first_name,
//         lastName: res2[friend].last_name
//       };
//       console.log(4, newFriend);
//       return newFriend;
//     }
//   });
//   console.log(5, 'newFriend');
//   // return newFriend;
// };

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSucess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  Actions.homepage();
};
