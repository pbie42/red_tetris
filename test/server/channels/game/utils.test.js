import Game from 'server/classes/Game';
import Player from 'server/classes/Player';
import { gameCreate } from 'server/channels/game/utils';
import { Server } from 'mock-socket';

const mockIO = new Server('ws://localhost:8080');

jest.mock('uniqid', () => () => '1');

describe('gameCreate', () => {
  const mockSocket = {
    emit: jest.fn(),
    id: '1',
    broadcast: {
      emit: jest.fn(),
    },
  };
  let games = [];
  const roomName = '';
  const username = 'Paul';
  const username2 = 'Jen';
  const player = new Player(mockSocket.id, username);
  const player2 = new Player(mockSocket.id + 1, username2);
  it('creates a new game if one does not exist', () => {
    const game = new Game(mockSocket.id, roomName, [player]);
    games = gameCreate(mockIO, mockSocket, roomName, player, games);
    expect(games).toEqual([game]);
  });

  it('adds a player to the game if it already exists', () => {
    const game = new Game(mockSocket.id, roomName, [player, player2]);
    games = gameCreate(mockIO, mockSocket, roomName, player2, games);
    expect(games).toEqual([game]);
  });

  it('does not add a player to an existing game if they are already in it', () => {
    const game = new Game(mockSocket.id, roomName, [player, player2]);
    games = gameCreate(mockIO, mockSocket, roomName, player, games);
    expect(games).toEqual([game]);
  });
  it('adds a player to the queue if player count is full', () => {
    const player3 = new Player('3', 'Dan');
    const player4 = new Player('4', 'Thomas');
    const player5 = new Player('5', 'Jalel');
    const player6 = new Player('6', 'Raph');
    const game = new Game(mockSocket.id, roomName, [player, player2, player3, player4, player5]);
    games = gameCreate(mockIO, mockSocket, roomName, player3, games);
    games = gameCreate(mockIO, mockSocket, roomName, player4, games);
    games = gameCreate(mockIO, mockSocket, roomName, player5, games);
    games = gameCreate(mockIO, mockSocket, roomName, player6, games);
    game.addPlayerToQueue(player6);
    console.log('game', game);
    expect(games).toEqual([game]);
  });
});
