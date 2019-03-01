const Piece = require('../Piece');

function selectPosition() {
  return Math.floor(Math.random() * 3) + 1;
}

function randomPiece() {
  const pieces = ['i', 'j', 'l', 'o', 's', 't', 'z'];
  return new Piece(pieces[Math.floor(Math.random() * pieces.length)], 0);
}

module.exports = {
  selectPosition,
  randomPiece,
};
