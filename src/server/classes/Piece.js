const {
  positionsI,
  positionsJ,
  positionsO,
  positionsL,
  positionsS,
  positionsT,
  positionsZ,
} = require('./utils/piecePositions');

module.exports = class Piece {
  constructor(piece, position) {
    this.piece = piece;
    this.position = position;
  }

  getPiece() {
    return this.piece;
  }

  nextPosition() {
    if (this.position === 3) this.position = 0;
    else this.position += 1;
  }

  getShape() {
    switch (this.piece) {
      case 'o':
        return positionsO.find(p => p.position === this.position).shape;
      case 'l':
        return positionsL.find(p => p.position === this.position).shape;
      case 'j':
        return positionsJ.find(p => p.position === this.position).shape;
      case 'i':
        return positionsI.find(p => p.position === this.position).shape;
      case 's':
        return positionsS.find(p => p.position === this.position).shape;
      case 't':
        return positionsT.find(p => p.position === this.position).shape;
      case 'z':
        return positionsZ.find(p => p.position === this.position).shape;
      default:
        return null;
    }
  }
};
