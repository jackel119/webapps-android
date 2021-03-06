import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TransactionReducer from './TransactionReducer';

export default combineReducers({
	auth: AuthReducer,
  receipt: TransactionReducer
});
