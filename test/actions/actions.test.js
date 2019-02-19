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
  it('has the correct type', () => {
    const action = playerSet();

    expect(action.type).toEqual(PLAYER_SET);
  });

  it('has the correct payload', () => {
    const action = playerSet('Paul');
    expect(action.payload).toEqual('Paul');
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
