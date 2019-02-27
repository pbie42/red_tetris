import Game from 'server/classes/Game';
import Player from 'server/classes/Player';
import { gameCreate } from 'server/channels/game/handlers';
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
    join: jest.fn(),
  };
  const mockedIO = {
    in: jest.fn(() => ({
      emit: jest.fn(),
    })),
    emit: jest.fn(),
  };
  let games = [];
  const roomName = '';
  const username = 'Paul';
  const username2 = 'Jen';
  const player = new Player(mockSocket.id, username);
  const player2 = new Player(mockSocket.id + 1, username2);
  it('creates a new game if one does not exist', () => {
    games = gameCreate(mockIO, mockSocket, roomName, player, games);
    expect(games.length).toEqual(1);
    expect(games[0].players).toEqual([player]);
    expect(games[0].id).toEqual('1');
    expect(games[0].pieces.length).toEqual(100);
  });

  it('adds a player to the game if it already exists', () => {
    games = gameCreate(mockedIO, mockSocket, roomName, player2, games);
    expect(games.length).toEqual(1);
    expect(games[0].players).toEqual([player, player2]);
    expect(games[0].id).toEqual('1');
    expect(games[0].pieces.length).toEqual(100);
  });

  it('does not add a player to an existing game if they are already in it', () => {
    games = gameCreate(mockIO, mockSocket, roomName, player, games);
    expect(games.length).toEqual(1);
    expect(games[0].players).toEqual([player, player2]);
    expect(games[0].id).toEqual('1');
    expect(games[0].pieces.length).toEqual(100);
  });

  it('adds a player to the queue if player count is full', () => {
    const player3 = new Player('3', 'Dan');
    const player4 = new Player('4', 'Thomas');
    const player5 = new Player('5', 'Jalel');
    const player6 = new Player('6', 'Raph');
    const game = new Game(mockSocket.id, roomName, [player, player2, player3, player4, player5]);
    games = gameCreate(mockedIO, mockSocket, roomName, player3, games);
    games = gameCreate(mockedIO, mockSocket, roomName, player4, games);
    games = gameCreate(mockedIO, mockSocket, roomName, player5, games);
    games = gameCreate(mockedIO, mockSocket, roomName, player6, games);
    game.addPlayerToQueue(player6);
    expect(games.length).toEqual(1);
    expect(games[0].players).toEqual([player, player2, player3, player4, player5]);
    expect(games[0].queue).toEqual([player6]);
    expect(games[0].id).toEqual('1');
    expect(games[0].pieces.length).toEqual(100);
  });
});
