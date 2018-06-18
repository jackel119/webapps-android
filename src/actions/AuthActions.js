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
        Global.EMAIL = res.data.email;
        Storages.init(Global.EMAIL, { userData: res.data });

        socket.emit('getFriends');
        socket.on('friends', friends => {
          console.log('friends', friends);
          Storages.set(Global.EMAIL, { friends: friends });
          socket.emit('getGroupsAndUsers');
        }); 

        socket.on('allGroupsAndUsers', groups => {
          console.log('groups', groups);
          Storages.set(Global.EMAIL, { groups: groups });
          Storages.get(Global.EMAIL).then(res => console.log('storage', res));
        });

        socket.emit('getBills');
        socket.on('allBills', async bills => {
          console.log('bills', bills);
          var transactionBillMap = []; 
          for (const bill of bills) {
            if (bill.bdata.payee === Global.EMAIL) {
              for (const spliter of bill.bdata.split) {
                var myfriend = null; 
                await Storages.getFriendByEmail(Global.EMAIL, spliter.user).then(friend => {
                  console.log('friend', friend);
                  myfriend = friend;
                });
                console.log('myfriend', myfriend);
                const transaction = {
                  fromEmail: Global.EMAIL, 
                  toEmail: myfriend.email,
                  toFirstName: myfriend.first_name,
                  toLastName: myfriend.last_name,
                  amount: '+' + spliter.splitAmount,
                  time: bill.bdata.timestamp,
                  description: bill.bdata.description,
                  shareWith: 'Paid for ' + myfriend.first_name,
                  billDetails: bill
                };
                transactionBillMap.push(transaction);
              } 
            } else {
              // for (const spliter of bill.bdata.split) {
              //   if (spliter.user.email === Global.EMAIL) {
              //     Storages.getFriendByEmail(Global.EMAIL, bill.bdata.payee.email).then(friend => console.log('friend', friend));
              //     const transaction = {
              //       fromEmail: bill.bdata.payee.email,
              //       // fromFirstName: bill.bdata.payee.first_name,
              //       // fromLastName: bill.bdata.payee.last_name,
              //       toEmail: spliter.user.email,
              //       // toFirstName: spliter.user.last_name,
              //       // toLastName: spliter.user.first_name,
              //       amount: '-' + spliter.splitAmount,
              //       time: bill.bdata.timestamp,
              //       description: bill.bdata.description,
              //       shareWith: 'Paid by TODO',
              //       // shareWith: 'Paid by ' + bill.bdata.payee.first_name,
              //       billDetails: bill
              //     };
              //     transactionBillMap.push(transaction);
              //   }
              // }
            }
          }
          Storages.set(Global.EMAIL, { transactionBillMap: transactionBillMap });
          console.log('transactionBillMap', transactionBillMap); 
          loginUserSucess(dispatch, { email, password });
        });
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
