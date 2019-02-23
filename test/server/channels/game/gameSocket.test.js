import { Server } from 'mock-socket';
import Player from 'server/classes/Player';
import Game from 'server/classes/Game';
import { gameSocket, handleGameLeave } from 'server/channels/game/gameSocket';

const mockIO = new Server('ws://localhost:8080');

describe('gameSocket', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: '1',
    broadcast: {
      emit: jest.fn(),
    },
  };
  let games = [];
  const username = 'Paul';
  const player = new Player(mockSocket.id, username);
  const players = [player];
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
  const payload = {
    gameID: '1',
    playerID: '2',
  };
  const player1 = new Player('1', 'Paul');
  const player2 = new Player('2', 'Jen');
  it('should remove a player from a game', () => {
    const game = new Game('1', 'Fun', [player1, player2]);
    const updatedGames = handleGameLeave(mockIO, mockSocket, [game], payload);
    expect(updatedGames).toEqual([new Game('1', 'Fun', [player1])]);
  });

  it('should add a player from the queue to the active players if there is a queue', () => {
    const game = new Game('1', 'Fun', [player1, player2]);
    const player3 = new Player('3', 'Nick');
    game.addPlayerToQueue(player3);
    const updatedGames = handleGameLeave(mockIO, mockSocket, [game], payload);
    const gameClone = new Game('1', 'Fun', [player1, player3]);
    expect(updatedGames).toEqual([gameClone]);
  });
});
