const Piece = require('../Piece');

function randomPiece() {
  const pieces = ['i', 'j', 'l', 'o', 's', 't', 'z'];
  return new Piece(pieces[Math.floor(Math.random() * pieces.length)]);
}

function pieceOrder() {
  const pieces = [];
  for (let i = 0; i < 100; i += 1) pieces.push(randomPiece());
  return pieces;
}

module.exports = pieceOrder;
