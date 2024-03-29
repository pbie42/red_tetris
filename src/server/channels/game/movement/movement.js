const { verifyPlacement } = require('./verify');

function movePieceRight(board, piece) {
  const { letter, shape, location } = piece.getInfo();
  if (verifyPlacement({ x: location.x + 1, y: location.y }, shape, board, letter)) {
    return { ...location, x: location.x + 1 };
  }
  return location;
}

function movePieceLeft(board, piece) {
  const { letter, shape, location } = piece.getInfo();
  if (verifyPlacement({ x: location.x - 1, y: location.y }, shape, board, letter)) {
    return { ...location, x: location.x - 1 };
  }
  return location;
}

function movePieceDown(board, piece) {
  const { letter, shape, location } = piece.getInfo();
  if (verifyPlacement({ x: location.x, y: location.y + 1 }, shape, board, letter)) {
    return { ...location, y: location.y + 1 };
  }
  return location;
}

function movePieceDrop(board, piece) {
  const { letter, shape, location } = piece.getInfo();
  let newY = location.y;
  while (verifyPlacement({ x: location.x, y: newY }, shape, board, letter)) {
    newY += 1;
  }
  return { ...location, y: newY - 1 };
}

module.exports = {
  movePieceDown,
  movePieceDrop,
  movePieceLeft,
  movePieceRight,
};
