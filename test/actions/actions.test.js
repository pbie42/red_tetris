import Player from 'server/classes/Player';

import {
  gameCreate,
  gameSet,
  gameExists,
  playerCreate,
  playerSet,
  playerExists,
} from 'client/actions';
import {
  GAME_CREATE,
  GAME_SET,
  GAME_EXISTS,
  PLAYER_CREATE,
  PLAYER_SET,
  PLAYER_EXISTS,
} from 'client/actions/types';

describe('playerCreate', () => {
  it('has the correct type', () => {
    const action = playerCreate();

    expect(action.type).toEqual(PLAYER_CREATE);
  });

  it('has the correct payload', () => {
    const action = playerCreate('Paul');
    expect(action.payload).toEqual('Paul');
  });
});

describe('playerSet', () => {
  const payload = { username: 'paul', id: '1' };
  it('has the correct type', () => {
    const action = playerSet(payload);

    expect(action.type).toEqual(PLAYER_SET);
  });

  it('has the correct payload', () => {
    const action = playerSet(payload);
    expect(action.payload).toEqual({ username: 'paul', id: '1' });
  });
});

describe('playerExists', () => {
  it('has the correct type', () => {
    const action = playerExists();

    expect(action.type).toEqual(PLAYER_EXISTS);
  });

  it('has the correct payload', () => {
    const action = playerExists('Sorry this player already exists');
    expect(action.payload).toEqual('Sorry this player already exists');
  });
});

// -------------------------------------------------------------------------Game

describe('gameCreate', () => {
  it('has the correct type', () => {
    const action = gameCreate('Fun', '1');

    expect(action.type).toEqual(GAME_CREATE);
  });

  it('has the correct payload', () => {
    const action = gameCreate('Fun', '1');
    expect(action.payload).toEqual({ roomName: 'Fun', playerID: '1' });
  });
});

describe('gameSet', () => {
  const player = new Player('1', 'Paul');
  const payload = {
    roomName: 'Fun',
    id: '1',
    players: [player],
    queue: [],
  };
  it('has the correct type', () => {
    const action = gameSet(payload);

    expect(action.type).toEqual(GAME_SET);
  });

  it('has the correct payload', () => {
    const action = gameSet(payload);
    expect(action.payload).toEqual({
      roomName: 'Fun',
      id: '1',
      players: [player],
      queue: [],
    });
  });
});

describe('gameExists', () => {
  it('has the correct type', () => {
    const action = gameExists();

    expect(action.type).toEqual(GAME_EXISTS);
  });

  it('has the correct payload', () => {
    const action = gameExists('Sorry this player already exists');
    expect(action.payload).toEqual('Sorry this player already exists');
  });
});
