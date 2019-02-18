import * as types from 'client/actions/types';

const initialState = {
  username: '',
  error: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.PLAYER_SET:
      return { ...state, username: payload, error: '' };
    case types.PLAYER_EXISTS:
      return { ...state, username: '', error: `Sorry '${payload}' is taken` };

    default:
      return state;
  }
};
