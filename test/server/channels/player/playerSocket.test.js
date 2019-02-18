import { playerSocket } from 'server/channels/player/playerSocket';

describe('playerSocket', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: 1,
  };
  let players = [];
  const payload = 'Paul';
  const type = 'PLAYER_CREATE';
  it('should add a player on PLAYER_CREATE', () => {
    const { updatedPlayers } = playerSocket(mockSocket, players, { payload, type });
    players = updatedPlayers;
    expect(players.length).toEqual(1);
  });

  it('should return same players if unknown type', () => {
    const { updatedPlayers } = playerSocket(mockSocket, players, { payload, type: 'FAKE_TYPE' });
    expect(updatedPlayers).toEqual(players);
  });
});
