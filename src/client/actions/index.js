import * as types from 'client/actions/types';

export function changeAuth(isLoggedIn) {
  return {
    type: types.CHANGE_AUTH,
    payload: isLoggedIn,
  };
}

export function playerCreate(username) {
  return {
    type: types.PLAYER_CREATE,
    payload: username,
    channel: 'player',
  };
}

export function playerSet(username) {
  return {
    type: types.PLAYER_SET,
    payload: username,
  };
}

export function playerExists(username) {
  return {
    type: types.PLAYER_EXISTS,
    payload: username,
  };
}
