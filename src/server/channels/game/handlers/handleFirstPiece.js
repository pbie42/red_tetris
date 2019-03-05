const { verifyPlacement } = require('../movement/verify');
const { gamePlayersUpdateEmit } = require('../emits');

function newDisplayBoardWithPiece(piece, playerBoard) {
  const newDisplayBoard = playerBoard;
  const { location, shape, letter } = piece.getInfo();
  let y = 0;
  let bY = location.y;
  while (shape[y] && newDisplayBoard[bY]) {
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

function handleFirstPiece(io, game) {
  const piece = game.getNextPiece(0);
  game.getPlayers().forEach((p) => {
    if (p.getActivity()) {
      console.log('player is active');
      p.setPiece(piece.getPiece(), piece.getPosition());
      const playerPiece = p.getPiece();
      console.log('playerPiece', playerPiece);
      const { location, shape, letter } = playerPiece.getInfo();
      const playerBoard = p.getBoard();
      if (verifyPlacement(location, shape, playerBoard, letter)) {
        const newDisplayBoard = newDisplayBoardWithPiece(playerPiece, playerBoard);
        console.log('newDisplayBoard', newDisplayBoard);
        p.updateDisplayBoard(newDisplayBoard);
        p.updateCurrent();
      }
    }
  });
  gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
}

module.exports = {
  handleFirstPiece,
  newDisplayBoardWithPiece,
};
