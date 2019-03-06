function newDisplayBoardWithPiece(piece, playerBoard) {
  const newDisplayBoard = JSON.parse(JSON.stringify(playerBoard));
  const { location, shape, letter } = piece.getInfo();
  let y = 0;
  let bY = location.y;
  while (shape[y] && bY <= newDisplayBoard.length - 1) {
    let x = 0;
    let bX = location.x;
    while (x < shape[0].length) {
      if (newDisplayBoard[bY] && newDisplayBoard[bY][bX] === 0 && shape[y][x] === letter) {
        newDisplayBoard[bY][bX] = letter;
      }
      bX += 1;
      x += 1;
    }
    bY += 1;
    y += 1;
  }
  return newDisplayBoard;
}

module.exports = {
  newDisplayBoardWithPiece,
};
