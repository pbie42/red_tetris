import lobbyReducer from 'client/reducers/lobby';
import { LOBBY_GAMES_UPDATE } from 'client/actions/types';
import Game from 'server/classes/Game';
import Player from 'server/classes/Player';

const initialState = {
  games: [],
};

it('handles actions of type LOBBY_GAMES_UPDATE', () => {
  const player1 = new Player('1', 'Paul');
  const player2 = new Player('2', 'Jen');
  const game1 = new Game('1', 'Fun', [player1]);
  const game2 = new Game('2', 'Funner', [player2]);
  const payload = [game1, game2];
  const action = {
    type: LOBBY_GAMES_UPDATE,
    payload,
  };
  const newState = lobbyReducer(initialState, action);
  expect(newState).toEqual({ games: [game1, game2] });
});

it('handles action with unknown type', () => {
  const newState = lobbyReducer([], { type: 'dsafdaslf' });
  expect(newState).toEqual([]);
});
