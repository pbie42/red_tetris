import Piece from 'server/classes/Piece';
import Player from 'server/classes/Player';
import { newDisplayBoardWithPiece } from 'server/channels/game/movement/utils';
import newBoard from 'server/classes/utils/newBoard';

describe('newDisplayBoardWithPiece', () => {
  const player = new Player('1', 'paul');
  const pieceL = new Piece('l', 0);
  const newDisplayBoard = newDisplayBoardWithPiece(pieceL, player.getBoard());
  it('should place a piece onto a the board passed to it and return a new board with the piece on it', () => {
    expect(newDisplayBoard).toEqual([
      [0, 0, 0, 0, 0, 'l', 0, 0, 0, 0],
      [0, 0, 0, 'l', 'l', 'l', 0, 0, 0, 0],
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
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
  it('should not modify the player board', () => {
    expect(player.getBoard()).toEqual(newBoard());
  });
});
