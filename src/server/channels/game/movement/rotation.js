const { verifyPlacement } = require('./verify');
const { getShape } = require('../../../classes/utils/piecePositions');

function rotatePiece(board, piece) {
  const { letter, position, location } = piece.getInfo();
  const nextShape = getShape(letter, position === 3 ? 0 : position + 1);
  let testLocations = [
    location,
    { x: location.x + 1, y: location.y },
    { x: location.x - 1, y: location.y },
  ];
  if (letter === 'i') {
    testLocations = testLocations.concat([
      { x: location.x + 2, y: location.y },
      { x: location.x - 2, y: location.y },
      { x: location.x, y: location.y + 1 },
    ]);
  }
  const newLocation = testLocations.find(l => verifyPlacement(l, nextShape, board, letter));
  if (newLocation) {
    piece.nextPosition();
    return newLocation;
  }
  return location;
}

module.exports = {
  rotatePiece,
};
