import gameReducer, { gameInitialState } from 'client/reducers/game';
import {
  GAME_SET, GAME_RESET, GAME_PLAYERS_UPDATE, GAME_QUEUE_UPDATE,
} from 'client/actions/types';
import Player from 'server/classes/Player';

it('handles actions of type GAME_SET', () => {
  const player = new Player('1', 'Paul');
  const payload = {
    roomName: 'Fun',
    id: '1',
    players: [player],
    queue: [],
  };
  const action = {
    type: GAME_SET,
    payload,
  };
  const newState = gameReducer(gameInitialState, action);
  expect(newState).toEqual({
    error: '',
    roomName: 'Fun',
    id: '1',
    players: [player],
    queue: [],
  });
});

it('handles actions of type GAME_RESET', () => {
  const action = {
    type: GAME_RESET,
    payload: '',
  };
  const newState = gameReducer(gameInitialState, action);
  expect(newState).toEqual({
    error: '',
    id: '',
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
    error: '',
    id: '',
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
    error: '',
    id: '',
    players: [],
    queue: [player1, player2],
    roomName: '',
  });
});

it('handles action with unknown type', () => {
  const newState = gameReducer([], { type: 'dsafdaslf' });
  expect(newState).toEqual([]);
});
