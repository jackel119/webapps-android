import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE, 
  TRANSACTION_INITIATE,
  ADD_ITEM
} from '../actions/types';

const INITIAL_STATE = {
  data: []
};

function updateItem(data, detail) {
  return data.map((item) => {
    if (item.id === detail.index) {
      console.log('REACHED!!!!!!!!!!!!');
      return { ...item, [detail.type]: detail.value };
    } else {
      return item;
    }
 });
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRANSACTION_INITIATE:
      return { ...state, from: 'me', amount: action.payload.amount, date: action.payload.date };
    case TRANSACTION_UPDATE:
      console.log('returned', updateItem(state.data, action.payload));
      return { data: updateItem(state.data, action.payload) };
    case TRANSACTION_CREATE:
      return INITIAL_STATE;
    case ADD_ITEM:
      return { data: [...state.data, { id: action.payload.id, name: '', amount: '' }] };
    default:
      return state;
  } 
};
