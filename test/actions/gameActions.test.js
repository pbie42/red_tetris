import Player from 'server/classes/Player';

import {
  gameCreate, gameSet, gameExists, gameReset,
} from 'client/actions';

import {
  GAME_CREATE, GAME_SET, GAME_EXISTS, GAME_RESET,
} from 'client/actions/types';

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

describe('gameReset', () => {
  it('has the correct type', () => {
    const action = gameReset();

    expect(action.type).toEqual(GAME_RESET);
  });

  it('has the correct payload', () => {
    const action = gameReset();
    expect(action.payload).toEqual('');
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
