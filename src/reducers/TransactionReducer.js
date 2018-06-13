import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE,
  TRANSACTION_INITIATE
} from '../actions/types';

const INITIAL_STATE = {
  to: '',
  from: '',
  date: '',
  currency: '',
  amount: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRANSACTION_INITIATE:
      console.log(action.payload);
      return { ...state, to: 'jkewishnu@163.com', from: 'me', amount: '1', date: action.payload.date };
    case TRANSACTION_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case TRANSACTION_CREATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
