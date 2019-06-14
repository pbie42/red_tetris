import Player from 'server/classes/Player';

import {
  gameCreate,
  gameExists,
  gameLeave,
  gameMovePieceRight,
  gameMovePieceLeft,
  gameMovePieceDown,
  gameMovePieceDrop,
  gameMovePieceRotate,
  gamePlayersUpdate,
  gameQueueUpdate,
  gameReset,
  gameSet,
  gameSetActive,
  gameSetDifficulty,
  gameSetListener,
  gameSetNewLeader,
  gameStart,
} from 'client/actions';

import {
  GAME_CREATE,
  GAME_EXISTS,
  GAME_LEAVE,
  GAME_MOVE_PIECE_RIGHT,
  GAME_MOVE_PIECE_LEFT,
  GAME_MOVE_PIECE_DOWN,
  GAME_MOVE_PIECE_DROP,
  GAME_MOVE_PIECE_ROTATE,
  GAME_PLAYERS_UPDATE,
  GAME_QUEUE_UPDATE,
  GAME_RESET,
  GAME_SET_ACTIVE,
  GAME_SET_DIFFICULTY,
  GAME_SET_LISTENING,
  GAME_SET_NEW_LEADER,
  GAME_SET,
  GAME_START,
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
    leader: player.getId(),
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
      leader: '1',
      players: [player],
      queue: [],
    });
  });
});

describe('gameLeave', () => {
  const payload = {
    playerID: '1',
    gameID: 'k1k2',
  };
  it('has the correct type', () => {
    const action = gameLeave(payload.playerID, payload.gameID);

    expect(action.type).toEqual(GAME_LEAVE);
  });

  it('has the correct payload', () => {
    const action = gameLeave(payload.playerID, payload.gameID);
    expect(action.payload).toEqual(payload);
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

describe('gamePlayersUpdate', () => {
  it('has the correct type', () => {
    const action = gamePlayersUpdate();

    expect(action.type).toEqual(GAME_PLAYERS_UPDATE);
  });

  it('has the correct payload', () => {
    const player1 = new Player('1', 'Dan');
    const player2 = new Player('2', 'Thomas');
    const action = gamePlayersUpdate([player1, player2]);
    expect(action.payload).toEqual([player1, player2]);
  });
});

describe('gameQueueUpdate', () => {
  it('has the correct type', () => {
    const action = gameQueueUpdate();

    expect(action.type).toEqual(GAME_QUEUE_UPDATE);
  });

  it('has the correct payload', () => {
    const player1 = new Player('1', 'Dan');
    const player2 = new Player('2', 'Thomas');
    const action = gameQueueUpdate([player1, player2]);
    expect(action.payload).toEqual([player1, player2]);
  });
});

describe('gameStart', () => {
  it('has the correct type', () => {
    const action = gameStart();
    expect(action.type).toEqual(GAME_START);
  });

  it('has the correct payload', () => {
    const action = gameStart('1', '2');
    expect(action.payload).toEqual({ gameID: '1', playerID: '2' });
  });

  it('has a game channel property', () => {
    const action = gameStart('1', '2');
    expect(action.channel).toEqual('game');
  });
});

describe('gameSetActive', () => {
  it('has the correct type', () => {
    const action = gameSetActive(true);
    expect(action.type).toEqual(GAME_SET_ACTIVE);
  });

  it('has the correct payload', () => {
    const action = gameSetActive(true);
    expect(action.payload).toEqual({ active: true });
  });
});

describe('gameSetNewLeader', () => {
  it('has the correct type', () => {
    const action = gameSetNewLeader(true);
    expect(action.type).toEqual(GAME_SET_NEW_LEADER);
  });

  it('has the correct payload', () => {
    const action = gameSetNewLeader('dsalijfda');
    expect(action.payload).toEqual({ leader: 'dsalijfda' });
  });
});

describe('gameMovePieceRight', () => {
  const gameID = 'game1';
  const playerID = 'player1';
  it('has the correct type', () => {
    const action = gameMovePieceRight(gameID, playerID);
    expect(action.type).toEqual(GAME_MOVE_PIECE_RIGHT);
  });

  it('has the correct payload', () => {
    const action = gameMovePieceRight(gameID, playerID);
    expect(action.payload).toEqual({ gameID, playerID });
  });

  it('has the correct channel', () => {
    const action = gameMovePieceRight(gameID, playerID);
    expect(action.channel).toEqual('game');
  });
});

describe('gameMovePieceLeft', () => {
  const gameID = 'game1';
  const playerID = 'player1';
  it('has the correct type', () => {
    const action = gameMovePieceLeft(gameID, playerID);
    expect(action.type).toEqual(GAME_MOVE_PIECE_LEFT);
  });

  it('has the correct payload', () => {
    const action = gameMovePieceLeft(gameID, playerID);
    expect(action.payload).toEqual({ gameID, playerID });
  });

  it('has the correct channel', () => {
    const action = gameMovePieceLeft(gameID, playerID);
    expect(action.channel).toEqual('game');
  });
});

describe('gameMovePieceDown', () => {
  const gameID = 'game1';
  const playerID = 'player1';
  it('has the correct type', () => {
    const action = gameMovePieceDown(gameID, playerID);
    expect(action.type).toEqual(GAME_MOVE_PIECE_DOWN);
  });

  it('has the correct payload', () => {
    const action = gameMovePieceDown(gameID, playerID);
    expect(action.payload).toEqual({ gameID, playerID });
  });

  it('has the correct channel', () => {
    const action = gameMovePieceDown(gameID, playerID);
    expect(action.channel).toEqual('game');
  });
});

describe('gameMovePieceRotate', () => {
  const gameID = 'game1';
  const playerID = 'player1';
  it('has the correct type', () => {
    const action = gameMovePieceRotate(gameID, playerID);
    expect(action.type).toEqual(GAME_MOVE_PIECE_ROTATE);
  });

  it('has the correct payload', () => {
    const action = gameMovePieceRotate(gameID, playerID);
    expect(action.payload).toEqual({ gameID, playerID });
  });

  it('has the correct channel', () => {
    const action = gameMovePieceRotate(gameID, playerID);
    expect(action.channel).toEqual('game');
  });
});

describe('gameMovePieceDrop', () => {
  const gameID = 'game1';
  const playerID = 'player1';
  it('has the correct type', () => {
    const action = gameMovePieceDrop(gameID, playerID);
    expect(action.type).toEqual(GAME_MOVE_PIECE_DROP);
  });

  it('has the correct payload', () => {
    const action = gameMovePieceDrop(gameID, playerID);
    expect(action.payload).toEqual({ gameID, playerID });
  });

  it('has the correct channel', () => {
    const action = gameMovePieceDrop(gameID, playerID);
    expect(action.channel).toEqual('game');
  });
});

describe('gameSetListener', () => {
  it('has the correct type', () => {
    const action = gameSetListener(true);
    expect(action.type).toEqual(GAME_SET_LISTENING);
  });

  it('has the correct payload', () => {
    const action = gameSetListener(true);
    expect(action.payload).toEqual({ listening: true });
  });
});

describe('gameSetDifficulty', () => {
  it('has the correct type', () => {
    const action = gameSetDifficulty(1);
    expect(action.type).toEqual(GAME_SET_DIFFICULTY);
  });

  it('has the correct payload', () => {
    const action = gameSetDifficulty(1);
    expect(action.payload).toEqual({ difficulty: 1 });
  });
});
