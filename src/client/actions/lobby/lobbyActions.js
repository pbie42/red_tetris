import * as types from 'client/actions/types';

export function lobbyGamesUpdate(games) {
  return {
    type: types.LOBBY_GAMES_UPDATE,
    payload: games,
  };
}

export function lobbyGetGames() {
  return {
    type: types.LOBBY_GET_GAMES,
    payload: {},
    channel: 'lobby',
  };
}
