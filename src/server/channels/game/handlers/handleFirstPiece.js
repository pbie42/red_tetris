const { verifyPlacement } = require('../movement/verify');
const { gamePlayersUpdateEmit } = require('../emits');
const { newDisplayBoardWithPiece } = require('../movement/utils');

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
        console.log('p before', p);
        const newDisplayBoard = newDisplayBoardWithPiece(playerPiece, playerBoard);
        console.log('newDisplayBoard', newDisplayBoard);
        console.log('p', p);
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
