import * as types from 'client/actions/types';

const initialState = {
  username: '',
  id: '',
  error: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.PLAYER_SET:
      return {
        ...state,
        username: payload.username,
        id: payload.id,
        error: '',
      };
    case types.PLAYER_EXISTS:
      return { ...state, error: 'Sorry that username is taken' };

    case types.PLAYER_ERROR_RESET:
      return { ...state, error: '' };

    case types.PLAYER_RESET:
      return initialState;

    default:
      return state;
  }
};
