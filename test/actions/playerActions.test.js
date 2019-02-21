import { playerCreate, playerSet, playerExists } from 'client/actions';
import { PLAYER_CREATE, PLAYER_SET, PLAYER_EXISTS } from 'client/actions/types';

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
