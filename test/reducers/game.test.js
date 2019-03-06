import gameReducer, { gameInitialState } from 'client/reducers/game';
import {
  GAME_PLAYERS_UPDATE,
  GAME_QUEUE_UPDATE,
  GAME_RESET,
  GAME_SET_ACTIVE,
  GAME_SET_LISTENING,
  GAME_SET_NEW_LEADER,
  GAME_SET,
} from 'client/actions/types';
import Player from 'server/classes/Player';

it('handles actions of type GAME_SET', () => {
  const player = new Player('1', 'Paul');
  const payload = {
    active: false,
    id: '1',
    leader: player.getId(),
    players: [player],
    queue: [],
    roomName: 'Fun',
  };
  const action = {
    type: GAME_SET,
    payload,
  };
  const newState = gameReducer(gameInitialState, action);
  expect(newState).toEqual({
    active: false,
    error: '',
    id: '1',
    leader: '1',
    listening: false,
    players: [player],
    queue: [],
    roomName: 'Fun',
  });
});

it('handles actions of type GAME_SET_ACTIVE', () => {
  const payload = {
    active: true,
  };
  const action = {
    type: GAME_SET_ACTIVE,
    payload,
  };
  const newState = gameReducer(gameInitialState, action);
  expect(newState).toEqual({
    active: true,
    error: '',
    listening: false,
    id: '',
    leader: '',
    players: [],
    queue: [],
    roomName: '',
  });
});

it('handles actions of type GAME_RESET', () => {
  const action = {
    type: GAME_RESET,
    payload: '',
  };
  const newState = gameReducer(gameInitialState, action);
  expect(newState).toEqual({
    active: false,
    error: '',
    listening: false,
    id: '',
    leader: '',
    players: [],
    queue: [],
    roomName: '',
  });
});

it('handles actions of type GAME_PLAYERS_UPDATE', () => {
  const player1 = new Player('1', 'Dan');
  const player2 = new Player('2', 'Thomas');
  const action = {
    type: GAME_PLAYERS_UPDATE,
    payload: [player1, player2],
  };
  const newState = gameReducer(gameInitialState, action);
  expect(newState).toEqual({
    active: false,
    error: '',
    listening: false,
    id: '',
    leader: '',
    players: [player1, player2],
    queue: [],
    roomName: '',
  });
});

it('handles actions of type GAME_QUEUE_UPDATE', () => {
  const player1 = new Player('1', 'Dan');
  const player2 = new Player('2', 'Thomas');
  const action = {
    type: GAME_QUEUE_UPDATE,
    payload: [player1, player2],
  };
  const newState = gameReducer(gameInitialState, action);
  expect(newState).toEqual({
    active: false,
    error: '',
    listening: false,
    id: '',
    leader: '',
    players: [],
    queue: [player1, player2],
    roomName: '',
  });
});

it('handles actions of type GAME_SET_NEW_LEADER', () => {
  const action = {
    type: GAME_SET_NEW_LEADER,
    payload: {
      leader: 'ioejaqwf',
    },
  };
  const newState = gameReducer(gameInitialState, action);
  expect(newState).toEqual({
    active: false,
    error: '',
    listening: false,
    id: '',
    leader: 'ioejaqwf',
    players: [],
    queue: [],
    roomName: '',
  });
});

it('handles actions of type GAME_SET_LISTENING', () => {
  const action = {
    type: GAME_SET_LISTENING,
    payload: {
      listening: true,
    },
  };
  const newState = gameReducer(gameInitialState, action);
  expect(newState).toEqual({
    active: false,
    error: '',
    listening: true,
    id: '',
    leader: '',
    players: [],
    queue: [],
    roomName: '',
  });
});

it('handles action with unknown type', () => {
  const newState = gameReducer([], { type: 'dsafdaslf' });
  expect(newState).toEqual([]);
});
