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

function removeFullRows(board, fullRows) {
  const cleanedBoard = JSON.parse(JSON.stringify(board));
  fullRows.forEach((fullRow) => {
    cleanedBoard.splice(fullRow, 1);
    cleanedBoard.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
  return cleanedBoard;
}

function checkBoardForFullRows(board) {
  const fullRows = [];
  let filledSpaces = 0;
  let y = 0;
  while (board[y]) {
    let x = 0;
    filledSpaces = 0;
    while (board[y][x]) {
      if (board[y][x] !== 0 && board[y][x] !== 'x') filledSpaces += 1;
      x += 1;
    }
    if (filledSpaces === 10) fullRows.push(y);
    y += 1;
  }
  return fullRows;
}

module.exports = {
  checkBoardForFullRows,
  newDisplayBoardWithPiece,
  removeFullRows,
};
