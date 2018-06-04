import { socket } from '../Global';
import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE
} from './types';

export const transactionCreate = ({ to, from, date, currency, amount }) => {
  return (dispatch) => {
    console.log({ to, from, date, currency, amount });
    socket.emit('createTX', 
      { to, from, amount, currency, description: 'test test test', groupID: null });
    dispatch({ type: TRANSACTION_CREATE });
  };
};

export const transactionUpdate = ({ prop, value }) => {
  return {
    type: TRANSACTION_UPDATE,
    payload: { prop, value }
  };
};
