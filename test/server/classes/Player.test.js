import Player from 'server/classes/Player';
import newBoard from 'server/classes/utils/newBoard';

let player;

describe('Player Class', () => {
  it('creates a new player with given id and username', () => {
    player = new Player(1, 'Paul');
    expect(player).toEqual(new Player(1, 'Paul'));
  });

  it('can return a board', () => {
    expect(player.getBoard()).toEqual(newBoard());
  });

  it('can return a the displayBoard', () => {
    expect(player.getDisplayBoard()).toEqual(newBoard());
  });

  it('can return the username', () => {
    expect(player.getUsername()).toEqual('Paul');
  });

  it('can return the ID', () => {
    expect(player.getId()).toEqual(1);
  });

  it('can return the player info', () => {
    expect(player.getInfo()).toEqual({ id: 1, username: 'Paul', board: newBoard() });
  });

  it('can increase current by 1', () => {
    player.updateCurrent();
    expect(player.current).toEqual(1);
  });

  it('can reset current', () => {
    player.resetCurrent();
    expect(player.current).toEqual(0);
  });

  it("can get the player's activity", () => {
    const activity = player.getActivity();
    expect(activity).toEqual(false);
  });

  it('can update the board', () => {
    const updatedBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 'l', 0, 0, 0],
      [0, 0, 0, 0, 'l', 'l', 'l', 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    player.updateBoard(updatedBoard);
    expect(player.getBoard()).toEqual(updatedBoard);
  });
  it('can update the display board', () => {
    const updatedBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 'l', 0, 0, 0],
      [0, 0, 0, 0, 'l', 'l', 'l', 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    player.updateDisplayBoard(updatedBoard);
    expect(player.getDisplayBoard()).toEqual(updatedBoard);
  });

  it('can add points based on number of lines cleared', () => {
    player.addPoints(1);
    expect(player.points).toEqual(40);
    player.addPoints(2);
    expect(player.points).toEqual(140);
    player.addPoints(3);
    expect(player.points).toEqual(440);
    player.addPoints(4);
    expect(player.points).toEqual(1640);
    player.addPoints(5);
    expect(player.points).toEqual(1640);
  });
});
