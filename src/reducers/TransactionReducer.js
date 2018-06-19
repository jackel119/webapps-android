import {
  TRANSACTION_CREATE,
  TRANSACTION_UPDATE, 
  TRANSACTION_INITIATE,
  ADD_ITEM,
  INITIALISE_STATE,
  UPDATE_TOTAL,
  UPDATE_DESCRIPTION,
  UPDATE_DATE
} from '../actions/types';

const INITIAL_STATE = {
  data: [], 
  total: 0,
  description: '',
  billDate: ''
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
      return { data: updateItem(state.data, action.payload), total: state.total, description: state.description, billDate: state.billDate };
    case TRANSACTION_CREATE:
      return INITIAL_STATE;
    case ADD_ITEM:
      if (action.payload.initial) {
        return { data: [...state.data, {
          id: action.payload.id, name: action.payload.name, price: action.payload.price }], 
          total: state.total, 
          description: state.description,
          billDate: state.billDate };
      } 
      return { data: [...state.data, { id: action.payload.id, name: '', price: '' }], total: state.total, description: state.description, billDate: state.billDate };
    case INITIALISE_STATE:
      return { data: [] };
    case UPDATE_TOTAL:
      return { data: state.data, total: action.payload, description: state.description, billDate: state.billDate };
    case UPDATE_DESCRIPTION:
      return { data: state.data, total: state.total, description: action.payload, billDate: state.billDate };
    case UPDATE_DATE:
      return { data: state.data, total: state.total, description: state.description, billDate: action.payload };
    default:
      return state;
  } 
};

