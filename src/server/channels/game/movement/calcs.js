function calcPieceEnd(shape, piece) {
  let end = 0;
  let x = 0;
  while (x < shape[0].length) {
    let y = 0;
    while (y < shape[0].length) {
      if (shape[y][x] === piece) end = x;
      y += 1;
    }
    x += 1;
  }
  return end;
}
function calcPieceStart(shape, piece) {
  let x = 0;
  while (x < shape[0].length) {
    let y = 0;
    while (y < shape[0].length) {
      const current = shape[y][x];
      console.log('current', current);
      if (current === piece) return x;
      y += 1;
    }
    x += 1;
  }
  return x;
}
function calcPieceBottom(shape, piece) {
  let bottom = 0;
  let y = 0;
  while (y < shape[0].length) {
    let x = 0;
    while (x < shape[0].length) {
      if (shape[y][x] === piece) bottom = y;
      x += 1;
    }
    y += 1;
  }
  return bottom;
}

function calcPieceOffsets(shape, piece) {
  const start = calcPieceStart(shape, piece);
  const end = calcPieceEnd(shape, piece);
  return { start, end };
}

module.exports = {
  calcPieceBottom,
  calcPieceEnd,
  calcPieceOffsets,
  calcPieceStart,
};
