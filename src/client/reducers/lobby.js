import * as types from 'client/actions/types';

const initialState = {
  games: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOBBY_GAMES_UPDATE:
      return { ...state, games: payload };

    default:
      return state;
  }
};
