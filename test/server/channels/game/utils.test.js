import Game from 'server/classes/Game';
import Player from 'server/classes/Player';
import { gameCreate } from 'server/channels/game/utils';

jest.mock('uniqid', () => () => '1');

describe('gameCreate', () => {
  const mockIO = {
    emit: jest.fn(),
  };
  const mockSocket = {
    emit: jest.fn(),
    id: '1',
    broadcast: {
      emit: jest.fn(),
    },
  };
  let games = [];
  const roomName = '';
  const username = 'Paul';
  const username2 = 'Jen';
  const player = new Player(mockSocket.id, username);
  const player2 = new Player(mockSocket.id + 1, username2);
  const game = new Game(mockSocket.id, roomName, [player]);
  it('creates a new game if one does not exist', () => {
    games = gameCreate(mockIO, mockSocket, roomName, player, games);
    expect(games).toEqual([game]);
  });

  it('adds a player to the game if it already exists', () => {
    games = gameCreate(mockIO, mockSocket, roomName, player2, games);
    expect(games).toEqual([game]);
  });

  it('does not add a player to an existing game if they are already in it', () => {
    games = gameCreate(mockIO, mockSocket, roomName, player, games);
    expect(games).toEqual([game]);
  });
});
