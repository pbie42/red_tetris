const { verifyPlacement } = require('../movement/verify');
const { gamePlayersUpdateEmit } = require('../emits');
const { newDisplayBoardWithPiece } = require('../movement/utils');

function handleFirstPiece(io, game) {
  const piece = game.getNextPiece(0);
  game.getPlayers().forEach((player) => {
    if (player.getActivity()) {
      player.setPiece(piece.getPiece(), piece.currentPosition());
      const playerPiece = player.getPiece();
      const { location, shape, letter } = playerPiece.getInfo();
      const playerBoard = player.getBoard();
      if (verifyPlacement(location, shape, playerBoard, letter)) {
        const newDisplayBoard = newDisplayBoardWithPiece(playerPiece, playerBoard);
        player.updateDisplayBoard(newDisplayBoard);
        player.updateCurrent();
      }
    }
  });
  gamePlayersUpdateEmit(io, game);
}

module.exports = {
  handleFirstPiece,
  newDisplayBoardWithPiece,
};
