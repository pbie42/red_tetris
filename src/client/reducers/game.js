import * as types from 'client/actions/types';

export const gameInitialState = {
  active: false,
  error: '',
  id: '',
  piece: {},
  players: [],
  queue: [],
  roomName: '',
  leader: '',
};

export default (state = gameInitialState, { type, payload }) => {
  switch (type) {
    case types.GAME_SET:
      console.log('reducer gameset');

      return {
        ...state,
        error: '',
        id: payload.id,
        leader: payload.leader,
        players: payload.players,
        queue: payload.queue,
        roomName: payload.roomName,
      };

    case types.GAME_SET_ACTIVE:
      console.log('reducer gamesetactive');

      return {
        ...state,
        active: payload.active,
      };
    case types.GAME_SET_PIECE:
      console.log('reducer gamesetpiece');

      return {
        ...state,
        piece: payload.piece,
      };

    case types.GAME_SET_NEW_LEADER:
      console.log('reducer gamesetnewleader');

      return {
        ...state,
        leader: payload.leader,
      };

    case types.GAME_PLAYERS_UPDATE:
      console.log('reducer gameplayersupdate');
      return {
        ...state,
        players: payload,
      };

    case types.GAME_QUEUE_UPDATE:
      console.log('reducer gamequeueupdate');
      return {
        ...state,
        queue: payload,
      };

    case types.GAME_RESET:
      console.log('reducer game reset');
      return gameInitialState;

    default:
      return state;
  }
};
