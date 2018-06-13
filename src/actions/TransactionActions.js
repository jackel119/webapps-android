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
  console.log('my uid is ' + uid);
  let toUID = -1;
  let fromUID = -1;

  if (to === 'me') {
    toUID = uid;
    fromUID = Storages.getFriendUID(uid, from);
  } else if (from === 'me') {
    toUID = Storages.getFriendUID(uid, to);
    fromUID = uid;
  } else {
    console.log('TO or FROM must be me');
  }
  console.log(toUID);
  console.log('to is: ' + toUID + 'from is: ' + fromUID);

  const transaction = {
    toUID, fromUID, amount, currency, description: 'test test test', groupID: null };
  return (dispatch) => {
    socket.emit('createTX', transaction);
    Storages.getAllKeys().then((result) => { console.log('4.have keys: ' + result); });
    socket.on('createTX', tx => {
      console.log(tx);
      Storages.addTX(uid, tx);
    });
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
