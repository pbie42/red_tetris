import Piece from 'server/classes/Piece';
import {
  positionsI,
  positionsJ,
  positionsL,
  positionsO,
  positionsS,
  positionsT,
  positionsZ,
} from 'server/classes/utils/piecePositions';

describe('Piece Class', () => {
  const piece = new Piece('l', 2);
  it('creates a new piece with given shape', () => {
    expect(piece).toEqual(new Piece('l', 2));
  });

  it("returns it's shape with get shape", () => {
    expect(piece.getPiece()).toEqual('l');
  });

  it("changes it's current position", () => {
    piece.nextPosition();
    expect(piece.position).toEqual(3);
  });

  it("changes it's position back to 0 if it was at 3 previously", () => {
    piece.nextPosition();
    expect(piece.position).toEqual(0);
  });

  it("returns it's shape on getPosition", () => {
    expect(piece.getShape()).toEqual(positionsL[0].shape);
  });

  it("returns it's location on getLocation", () => {
    expect(piece.getLocation()).toEqual({ x: 3, y: 0 });
  });

  it("it returns all of it's info on getInfo", () => {
    expect(piece.getInfo()).toEqual({
      shape: piece.getShape(),
      position: piece.getPosition(),
      location: piece.getLocation(),
      letter: piece.getPiece(),
    });
  });
});

describe('I Piece', () => {
  const piece = new Piece('i', 0);
  it('returns correct shape position 0', () => {
    expect(piece.getShape()).toEqual(positionsI[0].shape);
  });
  it('returns correct shape position 1', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsI[1].shape);
  });
  it('returns correct shape position 2', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsI[2].shape);
  });
  it('returns correct shape position 3', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsI[3].shape);
  });
});

describe('J Piece', () => {
  const piece = new Piece('j', 0);
  it('returns correct shape position 0', () => {
    expect(piece.getShape()).toEqual(positionsJ[0].shape);
  });
  it('returns correct shape position 1', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsJ[1].shape);
  });
  it('returns correct shape position 2', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsJ[2].shape);
  });
  it('returns correct shape position 3', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsJ[3].shape);
  });
});

describe('L Piece', () => {
  const piece = new Piece('l', 0);
  it('returns correct shape position 0', () => {
    expect(piece.getShape()).toEqual(positionsL[0].shape);
  });
  it('returns correct shape position 1', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsL[1].shape);
  });
  it('returns correct shape position 2', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsL[2].shape);
  });
  it('returns correct shape position 3', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsL[3].shape);
  });
});

describe('O Piece', () => {
  const piece = new Piece('o', 0);
  it('returns correct shape position 0', () => {
    expect(piece.getShape()).toEqual(positionsO[0].shape);
  });
  it('returns correct shape position 1', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsO[1].shape);
  });
  it('returns correct shape position 2', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsO[2].shape);
  });
  it('returns correct shape position 3', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsO[3].shape);
  });
});

describe('S Piece', () => {
  const piece = new Piece('s', 0);
  it('returns correct shape position 0', () => {
    expect(piece.getShape()).toEqual(positionsS[0].shape);
  });
  it('returns correct shape position 1', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsS[1].shape);
  });
  it('returns correct shape position 2', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsS[2].shape);
  });
  it('returns correct shape position 3', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsS[3].shape);
  });
});

describe('T Piece', () => {
  const piece = new Piece('t', 0);
  it('returns correct shape position 0', () => {
    expect(piece.getShape()).toEqual(positionsT[0].shape);
  });
  it('returns correct shape position 1', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsT[1].shape);
  });
  it('returns correct shape position 2', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsT[2].shape);
  });
  it('returns correct shape position 3', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsT[3].shape);
  });
});

describe('Z Piece', () => {
  const piece = new Piece('z', 0);
  it('returns correct shape position 0', () => {
    expect(piece.getShape()).toEqual(positionsZ[0].shape);
  });
  it('returns correct shape position 1', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsZ[1].shape);
  });
  it('returns correct shape position 2', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsZ[2].shape);
  });
  it('returns correct shape position 3', () => {
    piece.nextPosition();
    expect(piece.getShape()).toEqual(positionsZ[3].shape);
  });
});
