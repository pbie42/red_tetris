const { randomPiece } = require('./pieceRandom');

function pieceOrder() {
  const pieces = [];
  for (let i = 0; i < 100; i += 1) pieces.push(randomPiece());
  return pieces;
}

module.exports = pieceOrder;
