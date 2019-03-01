import Piece from 'server/classes/Piece';
import { verifyPlacement } from 'server/channels/game/movement/verify';
import newBoard from 'server/classes/utils/newBoard';

jest.mock('server/classes/utils/randomX', () => () => 0);

describe('verifyPlacement', () => {
  const piece1 = new Piece('o', 0);
  it('should return true if the piece can be placed', () => {
    const board = [
      ['i', 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['i', 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['i', 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['i', 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    const location = piece1.getLocation();
    const shape = piece1.getShape();
    const canPlace = verifyPlacement(location, shape, board, 0);
    expect(canPlace).toBeTruthy();
  });

  it('should return false if the piece can not be placed', () => {
    const board = [
      [0, 0, 0, 0, 'i', 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 'i', 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 'i', 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 'i', 0, 0, 0, 0, 0],
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
    const location = piece1.getLocation();
    const shape = piece1.getShape();
    const canPlace = verifyPlacement(location, shape, board, 0);
    expect(canPlace).toBeFalsy();
  });

  it("should return true for a piece that can fit on edge even if it's shape container goes out of bounds on right", () => {
    const pieceI = new Piece('i', 3);
    pieceI.setLocation({ x: 8, y: 0 });
    const board = newBoard();
    const location = pieceI.getLocation();
    const shape = pieceI.getShape();
    const canPlace = verifyPlacement(location, shape, board, 0);
    expect(canPlace).toBeTruthy();
  });

  it("should return true for a piece that can fit on bottom edge even if it's shape container goes out of bounds on bottom", () => {
    const pieceT = new Piece('t', 0);
    pieceT.setLocation({ x: 3, y: 18 });
    const board = newBoard();
    const location = pieceT.getLocation();
    const shape = pieceT.getShape();
    const canPlace = verifyPlacement(location, shape, board, 0);
    expect(canPlace).toBeTruthy();
  });

  it("should return true for a piece that can fit on left edge even if it's shape container goes out of bounds on bottom", () => {
    const pieceI = new Piece('i', 1);
    pieceI.setLocation({ x: -2, y: 0 });
    const board = newBoard();
    const location = pieceI.getLocation();
    const shape = pieceI.getShape();
    const canPlace = verifyPlacement(location, shape, board, 0);
    expect(canPlace).toBeTruthy();
  });
});
