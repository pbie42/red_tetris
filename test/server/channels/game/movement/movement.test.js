import Piece from 'server/classes/Piece';
import {
  movePieceDown,
  movePieceDrop,
  movePieceLeft,
  movePieceRight,
} from 'server/channels/game/movement/movement';
import newBoard from 'server/classes/utils/newBoard';

describe('movePieceRight', () => {
  const pieceO = new Piece('o', 0);
  it('should return new location if the piece can be moved right', () => {
    const board = newBoard();
    const location = pieceO.currentLocation();
    const newLocation = movePieceRight(board, pieceO);
    expect(newLocation).toEqual({ x: location.x + 1, y: location.y });
  });

  it('should return the same position if the piece can not be moved right because another piece is in the way', () => {
    const board = [
      [0, 0, 0, 0, 0, 0, 'i', 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 'i', 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 'i', 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 'i', 0, 0, 0],
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
    const location = pieceO.currentLocation();
    const newLocation = movePieceRight(board, pieceO);
    expect(newLocation).toEqual(location);
  });

  it('should return the same position if the piece can not move right because of the boundary', () => {
    const pieceI = new Piece('i', 1);
    pieceI.setLocation({ x: 7, y: 0 });
    const board = newBoard();
    const location = pieceI.currentLocation();
    const newPosition = movePieceRight(board, pieceI);
    expect(newPosition).toEqual(location);
  });
});

describe('movePieceLeft', () => {
  const pieceO = new Piece('o', 0);
  it('should return new location if the piece can be moved left', () => {
    const board = newBoard();
    const location = pieceO.currentLocation();
    const newLocation = movePieceLeft(board, pieceO);
    expect(newLocation).toEqual({ x: location.x - 1, y: location.y });
  });

  it('should return the same position if the piece can not be moved left because another piece is in the way', () => {
    const board = [
      [0, 0, 0, 'i', 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 'i', 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 'i', 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 'i', 0, 0, 0, 0, 0, 0],
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
    const location = pieceO.currentLocation();
    const newLocation = movePieceLeft(board, pieceO);
    expect(newLocation).toEqual(location);
  });

  it('should return the same position if the piece can not move left because of the boundary', () => {
    const pieceI = new Piece('i', 3);
    pieceI.setLocation({ x: -1, y: 0 });
    const board = newBoard();
    const location = pieceI.currentLocation();
    const newPosition = movePieceLeft(board, pieceI);
    expect(newPosition).toEqual(location);
  });
});

describe('movePieceDown', () => {
  const pieceO = new Piece('o', 0);
  it('should return new location if the piece can be moved down', () => {
    const board = newBoard();
    const location = pieceO.currentLocation();
    const newLocation = movePieceDown(board, pieceO);
    expect(newLocation).toEqual({ x: location.x, y: location.y + 1 });
  });

  it('should return the same position if the piece can not be moved down because another piece is in the way', () => {
    const board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 'i', 'i', 'i', 'i', 0, 0, 0],
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
    const location = pieceO.currentLocation();
    const newLocation = movePieceDown(board, pieceO);
    expect(newLocation).toEqual(location);
  });

  it('should return the same position if the piece can not move left because of the boundary', () => {
    const pieceI = new Piece('i', 3);
    pieceI.setLocation({ x: 4, y: 16 });
    const board = newBoard();
    const location = pieceI.currentLocation();
    const newPosition = movePieceDown(board, pieceI);
    expect(newPosition).toEqual(location);
  });
});

describe('movePieceDrop', () => {
  const pieceO = new Piece('o', 0);
  it('should return new location of the piece at the bottom of board', () => {
    const board = newBoard();
    const location = pieceO.currentLocation();
    const newLocation = movePieceDrop(board, pieceO);
    expect(newLocation).toEqual({ x: location.x, y: 18 });
  });
});
