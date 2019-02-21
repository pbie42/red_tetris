import gameReducer, { gameInitialState } from 'client/reducers/game';
import { GAME_SET, GAME_RESET } from 'client/actions/types';
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

it('handles action with unknown type', () => {
  const newState = gameReducer([], { type: 'dsafdaslf' });
  expect(newState).toEqual([]);
});
