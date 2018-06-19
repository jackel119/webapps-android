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
          Storages.set(Global.EMAIL, { friends });
          socket.emit('getGroupsAndUsers');
        }); 

        socket.on('allGroupsAndUsers', groups => {
          console.log('groups', groups);
          Storages.set(Global.EMAIL, { groups });
          socket.emit('getBills');
        });

        socket.on('allBills', async bills => {
          console.log('bills', bills);


          var transactionBillMap = []; 
          for (const bill of bills) {
            for (const item of bill.bdata.items) {
              for (var spliter1 of item.split) {
                if (spliter1.user === Global.EMAIL) {
                  spliter1.user = { email: Global.EMAIL, first_name: 'Me', last_name: '' };
                } else {
                  await Storages.getFriendByEmail(Global.EMAIL, spliter1.user)
                    .then(friend => {
                      spliter1.user = friend;
                    });
                }
              }
            } 

            var myfriend = null; 
            if (bill.bdata.payee === Global.EMAIL) {
              bill.bdata.payeeName = 'Me';
              for (var spliter of bill.bdata.split) {
                if (spliter.user !== Global.EMAIL) {
                  await Storages.getFriendByEmail(Global.EMAIL, spliter.user)
                    .then(friend => myfriend = friend);
                  spliter.user = myfriend;
                  const transaction = {
                    fromEmail: Global.EMAIL, 
                    toEmail: myfriend.email,
                    toFirstName: myfriend.first_name,
                    toLastName: myfriend.last_name,
                    amount: '+' + spliter.splitAmount,
                    time: bill.bdata.billDate,
                    description: bill.bdata.description,
                    shareWith: 'Paid for ' + myfriend.first_name,
                    billDetails: bill.bdata
                  };
                  transactionBillMap.push(transaction);
                } else {
                  spliter.user = { email: Global.EMAIL, first_name: 'Me', last_name: '' };
                  const transaction = {
                    fromEmail: Global.EMAIL, 
                    toEmail: Global.EMAIL, 
                    amount: ' ' + spliter.splitAmount,
                    time: bill.bdata.billDate,
                    description: bill.bdata.description,
                    shareWith: 'Paid for myself',
                    billDetails: bill.bdata
                  };
                  transactionBillMap.push(transaction);
                }
              }
            } else {
              await Storages.getFriendByEmail(Global.EMAIL, bill.bdata.payee)
                .then(friend => {
                  myfriend = friend;
                }); 
              console.log('myfriend', myfriend);
              bill.bdata.payeeName = myfriend.first_name + ' ' + myfriend.last_name;

              for (const spliter of bill.bdata.split) {
                if (spliter.user === Global.EMAIL) {
                  spliter.user = { email: Global.EMAIL, first_name: 'Me', last_name: '' };
                  const transaction = {
                    fromEmail: myfriend.email,
                    fromFirstName: myfriend.first_name,
                    fromLastName: myfriend.last_name,
                    toEmail: Global.EMAIL,
                    amount: '-' + spliter.splitAmount,
                    time: bill.bdata.billDate,
                    description: bill.bdata.description,
                    shareWith: 'Paid by ' + myfriend.first_name,
                    billDetails: bill.bdata
                  };
                  console.log('transaction', transaction);
                  transactionBillMap.push(transaction);
                } else {
                  await Storages.getFriendByEmail(Global.EMAIL, spliter.user)
                    .then(friend => spliter.user = friend);
                }
              }  
            }
          }
          Storages.set(Global.EMAIL, { transactionBillMap });
          Storages.set(Global.EMAIL, { bills });
          console.log('transactionBillMap', transactionBillMap); 
          Storages.get(Global.EMAIL).then(res => console.log('storage', res));
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
