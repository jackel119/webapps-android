import { socket } from '../Global';
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
    if (to === '' || from === '') {
      //TODO: set an alert for this
      console.log('CANNOT have empty user!');
      return;
    } else if (to === 'me' && from === 'me') {
      fromUID = uid;
      toUID = uid;
      transaction = {
      to: toUID,
      from: fromUID,
      amount: 111,
      currency: 0,
      description: 'TX between myself',
      groupID: null };
      socket.emit('createTX', transaction);
      socket.on('newTransaction', tx => {
        Storages.addTX(uid, tx);
      });
    } else if (to === 'me') {
      toUID = uid;
      Storages.getFriendUID(uid, from).then(res => {
        fromUID = res;
        transaction = {
        to: toUID,
        from: fromUID,
        amount: 222,
        currency: 0,
        description: 'TX to me',
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
        amount: 333,
        currency: 0,
        description: 'TX from me',
        groupID: null };
        socket.emit('createTX', transaction);
        socket.on('newTransaction', tx => {
          Storages.addTX(uid, tx);
        });
      });
    } else {
      console.log('TO or FROM must be me');
      return;
    }
    dispatch({ type: TRANSACTION_CREATE });
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
