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
  const player = new Player(mockSocket.id, username);
  const game = new Game(mockSocket.id, roomName, [player]);
  it('creates a new game if one does not exist', () => {
    games = gameCreate(mockIO, mockSocket, roomName, player, games);
    expect(games).toEqual([game]);
  });

  it('does not create a new player if one already exists', () => {
    games = gameCreate(mockIO, mockSocket, roomName, player, games);
    expect(games).toEqual([game]);
  });
});
