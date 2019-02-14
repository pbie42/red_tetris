import * as types from 'client/actions/types';

const initialState = {
  username: '',
};

export default (state = initialState, { type, payload }) => {
  console.log('in the user reducer');
  console.log('type', type);
  console.log('payload', payload);

  switch (type) {
    case types.USER_SET:
      console.log('payload', payload);
      return { ...state, username: payload };

    default:
      return state;
  }
};
