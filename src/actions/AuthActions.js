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
          Storages.get('TXs').then((txs1) => {
            const uid = txs1.from[0].from_user;
            if (uid == null) {
              console.log('1.first time');
            } else {
              console.log('1.uid is: ' + uid);
            }
          });

          Storages.set('email', email);
          Storages.set('TXs', txs);
          Storages.get('email').then((result) => console.log('AS email is: ' + result));
          Storages.get('TXs').then((result) => console.log('AS TXs is: ' + result.from[0].txid));
          console.log(txs);

          Storages.get('TXs').then((txs1) => {
            const uid = txs1.from[0].from_user;
            if (uid == null) {
              console.log('2.first time');
            } else {
              console.log('2.uid is: ' + uid);
            }
          });

          //if (txs1 != null) {
            //TODO
          //}
        });
        loginUserSucess(dispatch, { email, password });
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


  // const checkLoggedIn = () => {
  //     //let context = this;
  //     try {
  //        Storages.get('TXs').then((txs) => {
  //          if (txs != null) {
  //             const uid = txs.from[0].from_user;
  //             console.log('uid is: ' + uid);
  //          } else {
  //             console.log('first time');
  //         }
  //        });
  //     } catch (error) {
  //       console.log('error!!!');
  //     }
  // };
