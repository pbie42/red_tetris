function verifyPlacement(location, shape, board, piece) {
  let tetrimino = 0;
  let y = 0;
  let bY = location.y;
  while (shape[y] && board[bY]) {
    let x = 0;
    let bX = location.x;
    while (x < shape[0].length) {
      if (board[bY] && board[bY][bX] !== 0 && shape[y][x] !== 0) return false;
      if (shape[y][x] === piece) tetrimino += 1;
      bX += 1;
      x += 1;
    }
    bY += 1;
    y += 1;
  }
  if (tetrimino !== 4) return false;
  return true;
}

module.exports = {
  verifyPlacement,
};
