const { getShape } = require('./utils/piecePositions');

module.exports = class Piece {
  constructor(piece, position) {
    this.piece = piece;
    this.position = position;
    this.location = piece !== 'i' ? { x: 3, y: 0 } : { x: 3, y: -1 };
    this.active = true;
  }

  getPiece() {
    return this.piece;
  }

  getActivity() {
    return this.active;
  }

  setActivity(bool) {
    this.active = bool;
  }

  currentPosition() {
    return this.position;
  }

  nextPosition() {
    if (this.position === 3) this.position = 0;
    else this.position += 1;
  }

  currentLocation() {
    return this.location;
  }

  setLocation(newLocation) {
    this.location = newLocation;
  }

  getShape() {
    return getShape(this.piece, this.position);
  }

  getInfo() {
    return {
      letter: this.piece,
      position: this.position,
      location: this.location,
      shape: this.getShape(),
    };
  }
};
