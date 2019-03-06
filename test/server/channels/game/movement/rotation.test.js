import Piece from 'server/classes/Piece';
import { rotatePiece } from 'server/channels/game/movement/rotation';
import newBoard from 'server/classes/utils/newBoard';

describe('rotatePiece', () => {
  const pieceI = new Piece('i', 0);
  it('should return same location if the piece can be rotated in place but change piece position', () => {
    const pieceT = new Piece('t', 0);
    const board = newBoard();
    const location = pieceT.currentLocation();
    const newLocation = rotatePiece(board, pieceT);
    expect(newLocation).toEqual(location);
    expect(pieceT.currentPosition()).toEqual(1);
  });

  it('should return a new location if the piece is I and can be rotated in place but must be moved down one position at the start', () => {
    const board = newBoard();
    const newLocation = rotatePiece(board, pieceI);
    expect(newLocation).toEqual({ x: 3, y: 0 });
    expect(pieceI.currentPosition()).toEqual(1);
  });

  it('should return the same position if the piece can not be rotated, should not increase position', () => {
    pieceI.setLocation({ x: 7, y: 0 });
    const board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 'o', 'o', 0, 0, 0],
      [0, 0, 0, 0, 0, 'o', 'o', 0, 0, 0],
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
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    const location = pieceI.currentLocation();
    const newLocation = rotatePiece(board, pieceI);
    expect(newLocation).toEqual(location);
    expect(pieceI.currentPosition()).toEqual(1);
  });
  it('should return new position if the piece can be rotated but must shift left, should increase position', () => {
    pieceI.setLocation({ x: 7, y: 0 });
    const board = newBoard();
    const newLocation = rotatePiece(board, pieceI);
    expect(newLocation).toEqual({ x: 6, y: 0 });
    expect(pieceI.currentPosition()).toEqual(2);
  });
  it('should return new position if the piece can be rotated but must shift right, should increase position', () => {
    pieceI.nextPosition();
    pieceI.setLocation({ x: -1, y: 0 });
    const board = newBoard();
    const newLocation = rotatePiece(board, pieceI);
    expect(newLocation).toEqual({ x: 0, y: 0 });
    expect(pieceI.currentPosition()).toEqual(0);
  });

  it('should return new position if the piece is an I and can be rotated but must shift right two spaces, should increase position', () => {
    pieceI.nextPosition();
    expect(pieceI.currentPosition()).toEqual(1);
    pieceI.setLocation({ x: -2, y: 0 });
    const board = newBoard();
    const newLocation = rotatePiece(board, pieceI);
    expect(newLocation).toEqual({ x: 0, y: 0 });
    expect(pieceI.currentPosition()).toEqual(2);
  });
});
