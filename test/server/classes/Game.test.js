import Game from 'server/classes/Game';
import Player from 'server/classes/Player';
import Piece from 'server/classes/Piece';

jest.mock('server/classes/utils/pieceOrder', () => () => [
  {
    piece: 'l',
    position: 1,
    location: { x: 3, y: 0 },
    active: true,
  },
  {
    piece: 't',
    position: 3,
    location: { x: 3, y: 0 },
    active: true,
  },
]);

describe('Game Class', () => {
  const pieceL = new Piece('l', 1);
  const pieceT = new Piece('t', 3);
  const player = new Player('1', 'Paul');
  const player2 = new Player('2', 'Jen');
  const player3 = new Player('3', 'Michael');
  const game = new Game('1', 'Fun', [player]);
  it('creates a new game with given id, roomName, and players', () => {
    expect(game.players).toEqual([player]);
    expect(game.queue).toEqual([]);
    expect(game.id).toEqual('1');
    expect(game.pieces.length).toEqual(2);
    expect(game.getActivity()).toEqual(false);
  });

  it('can set itself to active', () => {
    game.startGame();
    expect(game.getActivity()).toEqual(true);
  });

  it('can set itself to inactive', () => {
    game.endGame();
    expect(game.getActivity()).toEqual(false);
  });

  it('can return the ID', () => {
    expect(game.getId()).toEqual('1');
  });

  it('can return the roomName', () => {
    expect(game.getRoomName()).toEqual('Fun');
  });

  it('can return the players', () => {
    expect(game.getPlayers()).toEqual([player]);
  });

  it('can return the players with only relevant information to the front', () => {
    expect(game.getPlayersFront()).toEqual([
      {
        id: player.getId(),
        username: player.getUsername(),
        board: player.getDisplayBoard(),
        points: player.points,
      },
    ]);
  });

  it('can add a player to itself', () => {
    game.addPlayer(player2);
    expect(game.getPlayers()).toEqual([player, player2]);
  });

  it('can return the players count', () => {
    expect(game.getPlayersCount()).toEqual(2);
  });

  it('can add a player to the queue', () => {
    game.addPlayerToQueue(player3);
    expect(game.getQueue()).toEqual([player3]);
  });

  it('can return a player by their id', () => {
    expect(game.getPlayer('1')).toEqual(player);
  });

  it('can return a player by their id', () => {
    expect(game.getPlayer('1')).toEqual(player);
  });

  it('can return the next piece in line based on player current', () => {
    const playerForCurrent = game.getPlayer('1');
    expect(game.getNextPiece(playerForCurrent.current)).toEqual(pieceL);
    playerForCurrent.updateCurrent();
    expect(game.getNextPiece(playerForCurrent.current)).toEqual(pieceT);
  });

  it("can add new pieces to it's pieces array", () => {
    game.getNewPieces();
    expect(game.getPieces().length).toEqual(4);
  });

  it("can return all of it's info at once", () => {
    expect(game.getInfo()).toEqual({
      active: false,
      id: '1',
      pieces: [pieceL, pieceT, pieceL, pieceT],
      players: [player, player2],
      queue: [player3],
      roomName: 'Fun',
    });
  });

  it("can return all of it's relevant info for the front at once", () => {
    expect(game.getInfoFront()).toEqual({
      id: game.getId(),
      roomName: game.getRoomName(),
      players: game.getPlayersFront(),
      active: game.getActivity(),
      leader: game.getLeader(),
    });
  });
});
