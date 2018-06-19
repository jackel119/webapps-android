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
          socket.emit('getBills');
        });

        socket.on('allBills', async bills => {
          console.log('bills', bills);
          var transactionBillMap = []; 
          for (const bill of bills) {
            var myfriend = null; 
            if (bill.bdata.payee === Global.EMAIL) {
              // for (const item of bill.bdata.items) {
              //   for (const spliter of item.split) {
              //     // console.log('spliter', spliter);
              //     if (spliter.user === Global.EMAIL) {
              //       spliter.name = 'myself';
              //     } else {
              //       spliter.name = 'not myself';
              //     }
              //     // console.log('after spliter', spliter);
              //   } 
              // }

              for (const spliter of bill.bdata.split) {

                if (spliter.user != Global.EMAIL) {
                  console.log(spliter);
                  await Storages.getFriendByEmail(Global.EMAIL, spliter.user)
                    .then(friend => myfriend = friend);
                  const transaction = {
                    fromEmail: Global.EMAIL, 
                    toEmail: myfriend.email,
                    toFirstName: myfriend.first_name,
                    toLastName: myfriend.last_name,
                    amount: '+' + spliter.splitAmount,
                    time: bill.bdata.timestamp,
                    description: bill.bdata.description,
                    shareWith: 'Paid for ' + myfriend.first_name,
                    billDetails: bill.bdata
                  };
                  transactionBillMap.push(transaction);
                  console.log('transactionBillMap', transactionBillMap);
                }
              } 
            } else {
              await Storages.getFriendByEmail(Global.EMAIL, bill.bdata.payee)
                .then(friend => {
                  myfriend = friend;
                }); 
              for (const spliter of bill.bdata.split) {
                if (spliter.user === Global.EMAIL) {
                  const transaction = {
                    fromEmail: myfriend.email,
                    fromFirstName: myfriend.first_name,
                    fromLastName: myfriend.last_name,
                    toEmail: Global.EMAIL,
                    amount: '-' + spliter.splitAmount,
                    time: bill.bdata.timestamp,
                    description: bill.bdata.description,
                    shareWith: 'Paid by ' + myfriend.first_name,
                    billDetails: bill.bdata
                  };
                  transactionBillMap.push(transaction);
                }
              }  
            } 
          }
          Storages.set(Global.EMAIL, { transactionBillMap: transactionBillMap });
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
