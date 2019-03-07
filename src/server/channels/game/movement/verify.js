function verifyPlacement(location, shape, board, piece) {
  let tetrimino = 0;
  let y = 0;
  let bY = location.y;
  while (shape[y] && bY < board.length) {
    let x = 0;
    let bX = location.x;
    while (x < shape[0].length) {
      if (bY >= 0 && board[bY] && board[bY][bX] !== 0 && shape[y][x] !== 0) return false;
      if (bY >= 0 && shape[y][x] === piece) tetrimino += 1;
      bX += 1;
      x += 1;
    }
    bY += 1;
    y += 1;
  }
  if (tetrimino !== 4) return false;
  return true;
}

function verifyNotInSolid(location, shape, board) {
  let y = 0;
  let bY = location.y;
  while (shape[y] && bY < board.length) {
    let x = 0;
    let bX = location.x;
    while (x < shape[0].length) {
      if (bY >= 0 && board[bY] && board[bY][bX] === 'x' && shape[y][x] !== 0) return false;
      bX += 1;
      x += 1;
    }
    bY += 1;
    y += 1;
  }
  return true;
}

module.exports = {
  verifyPlacement,
  verifyNotInSolid,
};
