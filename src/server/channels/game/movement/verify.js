function verifyPlacement(location, shape, board, startX) {
  let y = 0;
  let bY = location.y;
  while (shape[y] && board[y]) {
    let x = startX;
    let bX = location.x;
    while (x < shape[0].length) {
      if (board[bY] && board[bY][bX] !== 0 && shape[y][x] !== 0) return false;
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
};
