const { movePieceDown, movePieceLeft, movePieceRight } = require('../movement/movement');
const { newDisplayBoardWithPiece } = require('./handleFirstPiece');
const { gamePlayersUpdateEmit } = require('../emits');

function handleGamePieceMove(io, socket, games, { gameID, playerID }, type) {
  const game = games.find(g => g.getId() === gameID);
  const player = game.getPlayers().find(p => p.getId() === playerID);
  const piece = player.getPiece();
  let newLocation;
  let newDisplayBoard;
  if (!game || !player || !piece) return games;
  switch (type) {
    case 'right':
      newLocation = movePieceRight(player.getBoard(), player.getPiece());
      if (newLocation === piece.getLocation()) return games;
      piece.setLocation(newLocation);
      newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
      player.updateDisplayBoard(newDisplayBoard);
      gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
      return games;
    case 'left':
      newLocation = movePieceLeft(player.getBoard(), player.getPiece());
      if (newLocation === piece.getLocation()) return games;
      piece.setLocation(newLocation);
      newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
      player.updateDisplayBoard(newDisplayBoard);
      gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
      break;
    case 'down':
      newLocation = movePieceDown(player.getBoard(), player.getPiece());
      if (newLocation === piece.getLocation()) return games;
      piece.setLocation(newLocation);
      newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
      player.updateDisplayBoard(newDisplayBoard);
      gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
      break;
    case 'rotate':
      console.log('rotate');
      break;
    default:
      break;
  }
  return games;
}

module.exports = {
  handleGamePieceMove,
};
