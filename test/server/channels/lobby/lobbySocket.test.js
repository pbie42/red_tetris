import { lobbySocket } from 'server/channels/lobby/lobbySocket';

describe('lobbySocket', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: 1,
    broadcast: {
      emit: jest.fn(),
    },
  };
  const games = [];
  const payload = '';
  const type = 'LOBBY_GET_GAMES';
  it('should emit games on LOBBY_GET_GAMES', () => {
    lobbySocket(mockSocket, games, { payload, type });
    expect(mockSocket.emit).toBeCalledTimes(1);
  });
});
