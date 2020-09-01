const { createStore } = require('redux');

const initialState = {
  contacts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
