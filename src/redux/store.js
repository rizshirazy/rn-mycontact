const { createStore } = require('redux');

const initialState = {};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer);

export default store;
