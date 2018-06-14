import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE, 
  TRANSACTION_INITIATE,
  ADD_ITEM
} from '../actions/types';

const INITIAL_STATE = {
  counter: 0,
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
      console.log('In reducer', action.payload);
      return { data: action.payload };
    case TRANSACTION_UPDATE:
      console.log(state, action);
      return { data: updateItem(state.data, action.payload) };
    case TRANSACTION_CREATE:
      return INITIAL_STATE;
    case ADD_ITEM:
      console.log(action.payload);
      if (action.payload.initial) {
        return { data: [...state.data, { id: action.payload.id, 
          name: action.payload.name, price: action.payload.price }] };
      }
      return { data: [...state.data, { id: action.payload.id, name: '', price: '' }] };
    default:
      return state;
  } 
};
