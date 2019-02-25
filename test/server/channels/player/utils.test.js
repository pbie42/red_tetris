import Player from 'server/classes/Player';
import { playerCreate, playerRemove } from 'server/channels/player/utils';

describe('playerCreate', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: 1,
    broadcast: {
      emit: jest.fn(),
    },
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

describe('playerRemove', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: 1,
    broadcast: {
      emit: jest.fn(),
    },
  };
  const username = 'Paul';
  const player = new Player(mockSocket.id, username);
  let players = [player];
  it('returns same players array if the player to remove does not exist', () => {
    players = playerRemove(mockSocket, { username: 'Steve' }, players);
    expect(players).toEqual([player]);
  });

  it('removes the player if they exist', () => {
    players = playerRemove(mockSocket, { username }, players);
    expect(players).toEqual([]);
    expect(mockSocket.emit).toBeCalledTimes(1);
  });
});
