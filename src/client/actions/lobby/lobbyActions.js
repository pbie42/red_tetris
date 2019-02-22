import * as types from 'client/actions/types';

// eslint-disable-next-line
export function lobbyGamesUpdate(games) {
  return {
    type: types.LOBBY_GAMES_UPDATE,
    payload: games,
  };
}
