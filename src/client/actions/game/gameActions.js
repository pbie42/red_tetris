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

export function gamePlayersUpdate(players) {
  return {
    type: types.GAME_PLAYERS_UPDATE,
    payload: players,
  };
}

export function gameQueueUpdate(players) {
  return {
    type: types.GAME_QUEUE_UPDATE,
    payload: players,
  };
}

export function gameReset() {
  return {
    type: types.GAME_RESET,
    payload: '',
  };
}

export function gameLeave(playerID, gameID) {
  return {
    type: types.GAME_LEAVE,
    payload: {
      playerID,
      gameID,
    },
    channel: 'game',
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
