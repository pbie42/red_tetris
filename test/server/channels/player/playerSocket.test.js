import { playerSocket } from 'server/channels/player/playerSocket';

describe('playerSocket', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: 1,
    broadcast: {
      emit: jest.fn(),
    },
  };
  let players = [];
  it('should add a player on PLAYER_CREATE', () => {
    const { updatedPlayers } = playerSocket(mockSocket, players, {
      payload: 'Paul',
      type: 'PLAYER_CREATE',
    });
    players = updatedPlayers;
    expect(players.length).toEqual(1);
  });

  it('should return same players if unknown type', () => {
    const { updatedPlayers } = playerSocket(mockSocket, players, {
      payload: {},
      type: 'FAKE_TYPE',
    });
    expect(updatedPlayers).toEqual(players);
  });

  it('should remove a player on PLAYER_REMOVE', () => {
    const { updatedPlayers } = playerSocket(mockSocket, players, {
      payload: { username: 'Paul' },
      type: 'PLAYER_REMOVE',
    });
    players = updatedPlayers;
    expect(players.length).toEqual(0);
  });
});
