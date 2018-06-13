import { socket } from '../Global';
import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE,
  TRANSACTION_INITIATE,
  ADD_ITEM
} from './types';
import Storages from './Storages';

const Global = require('./../Global');

export const transactionCreate = ({ to, from, date, currency, amount }) => {
  const transaction = {
    to, from, amount, currency, description: 'test test test', groupID: null };
  return (dispatch) => {
    socket.emit('createTX', transaction);
    Storages.getAllKeys().then((result) => { console.log('4.have keys: ' + result); });
    const uid = Global.UID;
    console.log('uid is: ' + uid);
    const exampleTX = {
          txid: '1',
          from_user: uid,
          to_user: '3',
          currency: 0,
          amount: 'howMuch',
          time: 'dateCreated',
          description: 'description',
          status: 0,
          gid: null
        };


    Storages.addTX(uid, exampleTX);

    // socket.on('newTransaction', tx => {
    //   const uid = Global.uid;
    //
    //   Storages.add(uid, tx);
    //   //console.log(tx);
    // });

    Storages.get(uid).then((result) => console.log(result));
    console.log(transaction);
    dispatch({ type: TRANSACTION_CREATE });
  };
};

export const transactionUpdate = ({ index, type, value }) => {
  return {
    type: TRANSACTION_UPDATE,
    payload: { index, type, value }
  };
};

export const transactionInitiate = (initial) => {
  return {
    type: TRANSACTION_INITIATE,
    payload: initial
  };
};

export const addItem = (counter) => {
  return {
    type: ADD_ITEM,
    payload: counter
  };
};

