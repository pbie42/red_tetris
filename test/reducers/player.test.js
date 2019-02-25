import playerReducer from 'client/reducers/player';
import { PLAYER_SET, PLAYER_EXISTS, PLAYER_RESET } from 'client/actions/types';

const initialState = {
  error: '',
  id: '',
  username: '',
};

it('handles actions of type PLAYER_SET', () => {
  const payload = { username: 'paul', id: '1' };
  const action = {
    type: PLAYER_SET,
    payload,
  };
  const newState = playerReducer(initialState, action);
  expect(newState).toEqual({ username: 'paul', id: '1', error: '' });
});

it('handles actions of type PLAYER_RESET', () => {
  const payload = {};
  const action = {
    type: PLAYER_RESET,
    payload,
  };
  const newState = playerReducer(initialState, action);
  expect(newState).toEqual(initialState);
});

it('handles actions of type PLAYER_EXISTS', () => {
  const action = {
    type: PLAYER_EXISTS,
    payload: 'Paul',
  };
  const newState = playerReducer(initialState, action);
  expect(newState).toEqual({ username: '', id: '', error: "Sorry 'Paul' is taken" });
});

it('handles action with unknown type', () => {
  const newState = playerReducer([], { type: 'dsafdaslf' });
  expect(newState).toEqual([]);
});
