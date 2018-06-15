import { socket } from '../Global';
import { Actions } from 'react-native-router-flux';
import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE,
  TRANSACTION_INITIATE
} from './types';
import Storages from './Storages';

const Global = require('./../Global');

export const transactionCreate = ({ to, from, date, currency, amount }) => {
  const uid = Global.UID;
  let transaction = {};
  let toUID = -1;
  let fromUID = -1;

  return (dispatch) => {
    if ((to === '' || from === '') || (to === 'me' && from === 'me')) {
      alert('Invalid transaction!');
    } else if (to === 'me') {
      toUID = uid;
      Storages.getFriendUID(uid, from).then(res => {
        fromUID = res;
        transaction = {
        to: toUID,
        from: fromUID,
        amount: Number(amount),
        currency: Number(currency),
        description: 'TODO',
        groupID: null };
        socket.emit('createTX', transaction);
        socket.on('newTransaction', tx => {
          Storages.addTX(uid, tx);
        });
      });
    } else if (from === 'me') {
      fromUID = uid;
      Storages.getFriendUID(uid, to).then(res => {
        toUID = res;
        transaction = {
        to: toUID,
        from: fromUID,
        amount: Number(amount),
        currency: Number(currency), 
        description: 'TODO',
        groupID: null };
        console.log(transaction);
        socket.emit('createTX', transaction);
        socket.on('newTransaction', tx => {
          console.log('hiiii');
          Storages.addTX(uid, tx);
        });
      });
    } else {
      alert('TO or FROM must be me');
    }
    dispatch({ type: TRANSACTION_CREATE });
    setTimeout(function() { Actions.homepage(); }, 1000); 
  };
};

export const transactionUpdate = ({ prop, value }) => {
  return {
    type: TRANSACTION_UPDATE,
    payload: { prop, value }
  };
};

export const transactionInitiate = (initial) => {
  return {
    type: TRANSACTION_INITIATE,
    payload: initial
  };
};
