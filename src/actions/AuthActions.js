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

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    socket.emit('authentication', { username: email, password });
    socket.on('authResult', res => {
      if (res.result) {
        socket.emit('requestTXs');
        socket.on('allTransactions', txs => {

          const uid = txs.from[0].from_user.toString();

          //Storages.clearAll();
          Storages.delete(uid); //clear records, assuming it's the first time to login
          Storages.set('uid', 'txs'); // an arbitrary sample
          //Storages.set(uid, txs);

          // for checking
          Storages.getAllKeys().then((result) => {
            if (result.indexOf(uid) < 0) {
              // console.log('uid is: ' + uid);
              // console.log('TXs is: ' + txs);
              Storages.set(uid, txs); // login for the first time: store TXs with uid as key
              // console.log('1.have keys: ' + result)
            } else {
              // TODO: has logged in before
              Storages.update(uid, txs);
              // console.log('2.have keys: ' + result)
            }
          });


          // Storages.get(uid).then((result) => console.log(result));
          console.log(txs);
        });
        loginUserSucess(dispatch, { email, password });
        // Storages.getAllKeys().then((result) => console.log('3.have keys: ' + result));
      } else {
        loginUserFail(dispatch);
      }
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSucess = (dispatch, user) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  Actions.homepage();
};
