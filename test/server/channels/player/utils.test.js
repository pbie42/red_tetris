import Player from 'server/channels/player/Player';
import { playerCreate } from 'server/channels/player/utils';

describe('playerCreate', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: 1,
  };
  let players = [];
  const username = 'Paul';
  const player = new Player(mockSocket.id, username);
  it('creates a new player if one does not exist', () => {
    players = playerCreate(mockSocket, username, players);
    expect(players).toEqual([player]);
  });

  it('does not create a new player if one already exists', () => {
    players = playerCreate(mockSocket, username, players);
    expect(players).toEqual([player]);
  });
});
