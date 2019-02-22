import Game from 'server/classes/Game';
import Player from 'server/classes/Player';

import { lobbyGamesUpdate } from 'client/actions';
import { LOBBY_GAMES_UPDATE } from 'client/actions/types';

describe('lobbyGamesUpdate', () => {
  it('has the correct type', () => {
    const action = lobbyGamesUpdate();

    expect(action.type).toEqual(LOBBY_GAMES_UPDATE);
  });

  it('has the correct payload', () => {
    const player1 = new Player('1', 'Paul');
    const player2 = new Player('2', 'Jen');
    const game1 = new Game('1', 'Fun', [player1]);
    const game2 = new Game('2', 'Funner', [player2]);
    const action = lobbyGamesUpdate([game1, game2]);
    expect(action.payload).toEqual([game1, game2]);
  });
});
