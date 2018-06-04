import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE
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
    case TRANSACTION_UPDATE:
      return { ...state, [action.payload.props]: action.payload.value };
    case TRANSACTION_CREATE:
      return INITIAL_STATE;
    default:
      return state;
  } 
};
