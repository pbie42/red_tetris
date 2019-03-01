import Piece from 'server/classes/Piece';

import { calcPieceBottom, calcPieceEnd, calcPieceStart } from 'server/channels/game/movement/calcs';

describe('calcPieceBottom', () => {
  it("should find the bottom of a piece in it's shape array", () => {
    const piece = new Piece('i', 0);
    let y = calcPieceBottom(piece.getShape(), piece.getPiece());
    expect(y).toEqual(1);
    piece.nextPosition();
    y = calcPieceBottom(piece.getShape(), piece.getPiece());
    expect(y).toEqual(3);
    piece.nextPosition();
    y = calcPieceBottom(piece.getShape(), piece.getPiece());
    expect(y).toEqual(2);
  });
});

describe('calcPieceStart', () => {
  it("should find the start of the piece (furthest left) in it's shape array", () => {
    const piece = new Piece('i', 0);
    let x = calcPieceStart(piece.getShape(), piece.getPiece());
    expect(x).toEqual(0);
    piece.nextPosition();
    x = calcPieceStart(piece.getShape(), piece.getPiece());
    expect(x).toEqual(2);
    piece.nextPosition();
    x = calcPieceStart(piece.getShape(), piece.getPiece());
    expect(x).toEqual(0);
    piece.nextPosition();
    x = calcPieceStart(piece.getShape(), piece.getPiece());
    expect(x).toEqual(1);
  });
});

describe('calcPieceEnd', () => {
  it("should find the end of the piece (furthest right) in it's shape array", () => {
    const piece = new Piece('i', 0);
    let x = calcPieceEnd(piece.getShape(), piece.getPiece());
    expect(x).toEqual(3);
    piece.nextPosition();
    x = calcPieceEnd(piece.getShape(), piece.getPiece());
    expect(x).toEqual(2);
    piece.nextPosition();
    x = calcPieceEnd(piece.getShape(), piece.getPiece());
    expect(x).toEqual(3);
    piece.nextPosition();
    x = calcPieceEnd(piece.getShape(), piece.getPiece());
    expect(x).toEqual(1);
  });
});
