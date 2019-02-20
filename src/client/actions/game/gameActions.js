import * as types from 'client/actions/types';

export function gameCreate(roomName, playerID) {
  return {
    type: types.GAME_CREATE,
    payload: {
      roomName,
      playerID,
    },
    channel: 'game',
  };
}

export function gameExists(username) {
  return {
    type: types.GAME_EXISTS,
    payload: username,
  };
}

export function gameSet({
  roomName, id, players, queue,
}) {
  return {
    type: types.GAME_SET,
    payload: {
      roomName,
      id,
      players,
      queue,
    },
  };
}
