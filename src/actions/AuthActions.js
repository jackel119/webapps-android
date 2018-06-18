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

        // socket.emit('requestTXs');
        // socket.on('allTransactions', txs => {
        //   console.log('txs', txs);
        //   for (const tx of txs) {
        //     const { 
        //       amount, 
        //       email_from, 
        //       first_name_to, 
        //       first_name_from } = tx;
        //     if (email_from === Global.EMAIL) {
        //       tx.amount = '+' + amount;
        //       tx.shareWith = 'Paid for ' + first_name_to;
        //     } else {
        //       tx.amount = '-' + amount;
        //       tx.shareWith = 'Paid by ' + first_name_from;
        //     }
        //   }
        //   console.log('new txs', txs); 
        //   Storages.set(Global.EMAIL, { transactions: txs });
        //   socket.emit('getFriends');
        //   Storages.get(Global.EMAIL).then(res => console.log('storage', res));
        // });
        socket.emit('getBills');
        socket.on('allBills', bills => {
          console.log('bills', bills);
          var transactionBillMap = []; 
          for (const bill of bills) {
            if (bill.bdata.payee === Global.EMAIL) {
              for (const spliter of bill.bdata.split) {
                const transaction = {
                  fromEmail: bill.bdata.payee.email,
                  fromFirstName: bill.bdata.payee.first_name,
                  fromLastName: bill.bdata.payee.last_name,
                  toEmail: spliter.user.email,
                  toFirstName: spliter.user.first_name,
                  toLastName: spliter.user.last_name,
                  amount: '+' + spliter.splitAmount,
                  time: bill.bdata.timestamp,
                  description: bill.bdata.description,
                  shareWith: 'Paid for' + spliter.user.first_name,
                  billDetails: bill
                };
                transactionBillMap.push(transaction);
              }
            } else {
              for (const spliter of bill.bdata.split) {
                if (spliter.user.email === Global.EMAIL) {
                  const transaction = {
                    fromEmail: bill.bdata.payee.email,
                    fromFirstName: bill.bdata.payee.first_name,
                    fromLastName: bill.bdata.payee.last_name,
                    toEmail: spliter.user.email,
                    toFirstName: spliter.user.last_name,
                    toLastName: spliter.user.first_name,
                    amount: '-' + spliter.splitAmount,
                    time: bill.bdata.timestamp,
                    description: bill.bdata.description,
                    shareWith: 'Paid by' + bill.bdata.payee.first_name,
                    billDetails: bill
                  };
                  transactionBillMap.push(transaction);
                }
              }
            }
          }
          Storages.set(Global.EMAIL, { transactionBillMap: transactionBillMap });
          console.log('transactionBillMap', transactionBillMap); 
          socket.emit('getFriends');
        });

        socket.on('friends', friends => {
          console.log('friends', friends);
          Storages.set(Global.EMAIL, { friends: friends });
          socket.emit('getGroupsAndUsers');
        }); 

        socket.on('allGroupsAndUsers', groups => {
          console.log('groups', groups);
          Storages.set(Global.EMAIL, { groups: groups });
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
