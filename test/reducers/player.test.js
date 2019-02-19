import playerReducer from 'client/reducers/player';
import { PLAYER_SET, PLAYER_EXISTS } from 'client/actions/types';

it('handles actions of type PLAYER_SET', () => {
  const action = {
    type: PLAYER_SET,
    payload: 'Paul',
  };
  const initialState = {
    username: '',
    error: '',
  };
  const newState = playerReducer(initialState, action);
  expect(newState).toEqual({ username: 'Paul', error: '' });
});

it('handles actions of type PLAYER_EXISTS', () => {
  const action = {
    type: PLAYER_EXISTS,
    payload: 'Paul',
  };
  const initialState = {
    username: '',
    error: '',
  };
  const newState = playerReducer(initialState, action);
  expect(newState).toEqual({ username: '', error: "Sorry 'Paul' is taken" });
});

it('handles action with unknown type', () => {
  const newState = playerReducer([], { type: 'dsafdaslf' });
  expect(newState).toEqual([]);
});
