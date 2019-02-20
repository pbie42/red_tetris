import * as types from 'client/actions/types';

export function playerExists(username) {
  return {
    type: types.PLAYER_EXISTS,
    payload: username,
  };
}

export function playerCreate(username) {
  return {
    type: types.PLAYER_CREATE,
    payload: username,
    channel: 'player',
  };
}

export function playerSet({ username, id }) {
  return {
    type: types.PLAYER_SET,
    payload: { username, id },
  };
}
