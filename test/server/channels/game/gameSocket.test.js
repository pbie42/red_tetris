import { Server } from 'mock-socket';
import Player from 'server/classes/Player';
import Game from 'server/classes/Game';
import { gameSocket, handleGameLeave } from 'server/channels/game/gameSocket';

const mockIO = new Server('ws://localhost:8080');
jest.mock('uniqid', () => () => '1');

describe('gameSocket', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: '1',
    broadcast: {
      emit: jest.fn(),
    },
    join: jest.fn(),
  };
  let games = [];
  const username = 'Paul';
  const player = new Player(mockSocket.id, username);
  const player2 = new Player(mockSocket.id + 1, 'Jen');
  const players = [player, player2];
  const payload = {
    roomName: 'Fun',
    playerID: '1',
  };
  const type = 'GAME_CREATE';
  it('should add a game on GAME_CREATE', () => {
    const { updatedGames } = gameSocket(mockIO, mockSocket, games, players, { payload, type });
    games = updatedGames;
    expect(games.length).toEqual(1);
  });

  it('should remove a game when the last player leaves on GAME_LEAVE', () => {
    const { updatedGames } = gameSocket(mockIO, mockSocket, games, players, {
      payload: {
        playerID: '1',
        gameID: '1',
      },
      type: 'GAME_LEAVE',
    });
    expect(updatedGames).toEqual([]);
  });

  it('should return same games if unknown type', () => {
    const { updatedGames } = gameSocket(mockIO, mockSocket, games, players, {
      payload,
      type: 'RALKDJF',
    });
    expect(updatedGames).toEqual(games);
  });
});

describe('handleGameLeave', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: '1',
    broadcast: {
      emit: jest.fn(),
    },
  };
  const mockedIO = {
    in: jest.fn(() => ({
      emit: jest.fn(),
    })),
    emit: jest.fn(),
  };
  const payload = {
    gameID: '1',
    playerID: '2',
  };
  const player1 = new Player('1', 'Paul');
  const player2 = new Player('2', 'Jen');
  const player3 = new Player('3', 'Nick');
  const player4 = new Player('4', 'Josie');
  it('should remove a player from a game', () => {
    const game = new Game('1', 'Fun', [player1, player2]);
    const updatedGames = handleGameLeave(mockedIO, mockSocket, [game], payload);
    const gameCompare = new Game('1', 'Fun', [player1]);
    gameCompare.pieces = game.getPieces();
    expect(updatedGames).toEqual([gameCompare]);
    expect(mockSocket.emit).toHaveBeenCalledTimes(1);
  });

  it('should add a player from the queue to the active players if there is a queue', () => {
    const game = new Game('1', 'Fun', [player1, player2]);
    game.addPlayerToQueue(player3);
    const updatedGames = handleGameLeave(mockedIO, mockSocket, [game], payload);
    const gameClone = new Game('1', 'Fun', [player1, player3]);
    gameClone.pieces = game.getPieces();
    expect(updatedGames).toEqual([gameClone]);
    expect(mockSocket.emit).toHaveBeenCalledTimes(2);
  });

  it('should remove a game from games list if there are no players and no queue of players', () => {
    const payload2 = {
      gameID: '1',
      playerID: '1',
    };
    const game1 = new Game('1', 'Fun', [player1, player2]);
    const game2 = new Game('2', 'Funner', [player3, player4]);
    let updatedGames = handleGameLeave(mockedIO, mockSocket, [game1, game2], payload2);
    updatedGames = handleGameLeave(mockIO, mockSocket, [game1, game2], payload);
    expect(updatedGames).toEqual([game2]);
    expect(mockSocket.emit).toHaveBeenCalledTimes(4);
  });

  it('should remove a player from the queue if they are not a player', () => {
    const payload2 = {
      gameID: '1',
      playerID: '6',
    };
    const player5 = new Player('5', 'Martha');
    const player6 = new Player('6', 'Roy');
    const game1 = new Game('1', 'Fun', [player1, player2, player3, player4, player5]);
    game1.addPlayerToQueue(player6);
    expect(game1.queue.length).toEqual(1);
    const updatedGames = handleGameLeave(mockedIO, mockSocket, [game1], payload2);
    expect(updatedGames).toEqual([game1]);
    expect(updatedGames[0].queue.length).toEqual(0);
    expect(mockSocket.emit).toHaveBeenCalledTimes(5);
  });
});
