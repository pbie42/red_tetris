import Piece from 'server/classes/Piece';

let piece;

describe('Piece Class', () => {
  it('creates a new piece with given shape', () => {
    piece = new Piece('l');
    expect(piece).toEqual(new Piece('l'));
  });

  it("returns it's shape with get shape", () => {
    expect(piece.getPiece()).toEqual('l');
  });
});
