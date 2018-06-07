import { socket } from '../Global';
import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE,
  TRANSACTION_INITIATE
} from './types';

export const transactionCreate = ({ to, from, date, currency, amount }) => {
  const transaction = { 
    to, from, amount, currency, description: 'test test test', groupID: null };
  return (dispatch) => {
    socket.emit('createTX', transaction);
    console.log(transaction);
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
