import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE, 
  TRANSACTION_INITIATE,
  ADD_ITEM,
  INITIALISE_STATE,
} from '../actions/types';

const INITIAL_STATE = {
  data: []
};

function updateItem(data, detail) {
  return data.map((item) => {
    if (item.id === detail.index) {
      return { ...item, [detail.type]: detail.value };
    } else {
      return item;
    }
 });
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRANSACTION_INITIATE:
      return { data: action.payload };
    case TRANSACTION_UPDATE:
      return { data: updateItem(state.data, action.payload) };
    case TRANSACTION_CREATE:
      return INITIAL_STATE;
    case ADD_ITEM:
      if (action.payload.initial) {
        return { data: [...state.data, {
          id: action.payload.id, name: action.payload.name, price: action.payload.price }] };
      } 
      return { data: [...state.data, { id: action.payload.id, name: '', price: '' }] };
    case INITIALISE_STATE:
      return { data: [] };
    default:
      return state;
  } 
};

