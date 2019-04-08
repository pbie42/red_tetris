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

export function playerRemove(username, id) {
  return {
    type: types.PLAYER_REMOVE,
    payload: { username, id },
    channel: 'player',
  };
}

export function playerErrorReset() {
  return {
    type: types.PLAYER_ERROR_RESET,
    payload: {},
  };
}

export function playerSet({ username, id }) {
  return {
    type: types.PLAYER_SET,
    payload: { username, id },
  };
}
