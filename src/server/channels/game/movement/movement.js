const { verifyPlacement } = require('./verify');

function movePieceRight(board, piece) {
  const location = piece.getLocation();
  const shape = piece.getShape();
  const letter = piece.getPiece();
  if (
    verifyPlacement({ x: location.x + 1, y: location.y }, shape, board, letter)
  ) {
    return { ...location, x: location.x + 1 };
  }
  return location;
}

function movePieceLeft(board, piece) {
  const location = piece.getLocation();
  const shape = piece.getShape();
  const letter = piece.getPiece();
  if (
    verifyPlacement({ x: location.x - 1, y: location.y }, shape, board, letter)
  ) {
    return { ...location, x: location.x - 1 };
  }
  return location;
}

function movePieceDown(board, piece) {
  const location = piece.getLocation();
  const shape = piece.getShape();
  const letter = piece.getPiece();
  if (
    verifyPlacement({ x: location.x, y: location.y + 1 }, shape, board, letter)
  ) {
    return { ...location, y: location.y + 1 };
  }
  return location;
}

module.exports = {
  movePieceDown,
  movePieceLeft,
  movePieceRight,
};
