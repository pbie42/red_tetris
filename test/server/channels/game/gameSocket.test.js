import Player from 'server/classes/Player';
import { gameSocket } from 'server/channels/game/gameSocket';

describe('gameSocket', () => {
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
  const username = 'Paul';
  const player = new Player(mockSocket.id, username);
  const players = [player];
  const payload = {
    roomName: 'Fun',
    playerID: '1',
  };
  const type = 'GAME_CREATE';
  it('should add a game on GAME_CREATE', () => {
    const { updatedGames } = gameSocket(mockIO, mockSocket, games, players, { payload, type });
    games = updatedGames;
    expect(games.length).toEqual(1);
  });

  it('should return same games if unknown type', () => {
    const { updatedGames } = gameSocket(mockIO, mockSocket, games, players, {
      payload,
      type: 'RALKDJF',
    });
    expect(updatedGames).toEqual(games);
  });
});
