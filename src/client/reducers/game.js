import * as types from 'client/actions/types';

const initialState = {
  error: '',
  id: '',
  players: [],
  queue: [],
  roomName: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GAME_SET:
      console.log('reducer gameset', payload);

      return {
        ...state,
        error: '',
        id: payload.id,
        players: payload.players,
        queue: payload.queue,
        roomName: payload.roomName,
      };

    case types.GAME_RESET:
      console.log('reducer game reset', payload);
      return initialState;

    default:
      return state;
  }
};
