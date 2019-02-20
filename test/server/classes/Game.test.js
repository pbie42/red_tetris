import Game from 'server/classes/Game';
import Player from 'server/classes/Player';

describe('Game Class', () => {
  const player = new Player('1', 'Paul');
  const player2 = new Player('2', 'Jen');
  const player3 = new Player('3', 'Michael');
  const game = new Game('1', 'Fun', [player]);
  it('creates a new game with given id, roomName, and players', () => {
    expect(game).toEqual(new Game('1', 'Fun', [player]));
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

  it("can return all of it's info at once", () => {
    expect(game.getInfo()).toEqual({
      active: false,
      id: '1',
      pieces: [],
      players: [player, player2],
      queue: [player3],
      roomName: 'Fun',
    });
  });
});
