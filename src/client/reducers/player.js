import * as types from 'client/actions/types';

const initialState = {
  username: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.PLAYER_SET:
      return { ...state, username: payload };

    default:
      return state;
  }
};
