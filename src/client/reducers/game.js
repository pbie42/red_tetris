import * as types from 'client/actions/types';

export const gameInitialState = {
  active: false,
  error: '',
  listening: false,
  id: '',
  players: [],
  queue: [],
  roomName: '',
  leader: '',
  difficulty: 1,
};

export default (state = gameInitialState, { type, payload }) => {
  switch (type) {
    case types.GAME_SET:
      return {
        ...state,
        error: '',
        id: payload.id,
        leader: payload.leader,
        players: payload.players,
        queue: payload.queue,
        roomName: payload.roomName,
        difficulty: payload.difficulty,
      };

    case types.GAME_SET_ACTIVE:
      return {
        ...state,
        active: payload.active,
      };

    case types.GAME_SET_LISTENING:
      return {
        ...state,
        listening: payload.listening,
      };

    case types.GAME_SET_NEW_LEADER:
      return {
        ...state,
        leader: payload.leader,
      };

    case types.GAME_PLAYERS_UPDATE:
      return {
        ...state,
        players: payload,
      };

    case types.GAME_QUEUE_UPDATE:
      return {
        ...state,
        queue: payload,
      };

    case types.GAME_RESET:
      return gameInitialState;

    case types.GAME_SET_DIFFICULTY:
      return {
        ...state,
        difficulty: payload.difficulty,
      };

    default:
      return state;
  }
};
