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
  let toUID = '-1';
  let fromUID = '-1';

  if (to === 'me') {
    toUID = uid;
    fromUID = Storages.getFriendUID(uid, from);
  } 
  if (from === 'me') {
    Storages.getFriendUID(uid, to).then(id => {
      console.log('id: ' + id);
      toUID = id;
      console.log("zhe ge!!!!!!!" + toUID);
    });
    /* TODO: should be able to catch and throw errors */
    fromUID = uid;
  } else {
    // alert('You are not authorised to add this transaction!');
    return (dispatch) => {
      dispatch({ type: TRANSACTION_CREATE });
    };
  }


  const transaction = {
    to: toUID, from: fromUID, amount: 1, currency: 0, description: 'test test test', groupID: null };
  return (dispatch) => {
    // socket.emit('createTX', transaction);
    // socket.on('newTransaction', tx => {
    //   console.log(tx);
    //   Storages.addTX(uid, tx);
    //   Storages.get(uid).then((user) => { console.log(user.trans); });
    // });
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
