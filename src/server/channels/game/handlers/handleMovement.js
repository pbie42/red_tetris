const { movePieceDown, movePieceLeft, movePieceRight } = require('../movement/movement');
const { rotatePiece } = require('../movement/rotation');
const { newDisplayBoardWithPiece } = require('./handleFirstPiece');
const { gamePlayersUpdateEmit } = require('../emits');

function emitPieceNewLocation(io, game, player, piece, newLocation) {
  piece.setLocation(newLocation);
  const newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
  player.updateDisplayBoard(newDisplayBoard);
  gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
}

function handleGamePieceMove(io, socket, games, { gameID, playerID }, type) {
  const game = games.find(g => g.getId() === gameID);
  const player = game.getPlayers().find(p => p.getId() === playerID);
  const piece = player.getPiece();
  const position = piece.getPosition();
  let newLocation;
  let newDisplayBoard;
  let nextPiece;
  if (!game || !player || !piece) return games;
  switch (type) {
    case 'right':
      newLocation = movePieceRight(player.getBoard(), piece);
      if (newLocation === piece.getLocation()) return games;
      emitPieceNewLocation(io, game, player, piece, newLocation);
      return games;
    case 'left':
      newLocation = movePieceLeft(player.getBoard(), piece);
      if (newLocation === piece.getLocation()) return games;
      emitPieceNewLocation(io, game, player, piece, newLocation);
      break;
    case 'down':
      newLocation = movePieceDown(player.getBoard(), piece);
      if (newLocation === piece.getLocation()) {
        if (!piece.getActivity()) {
          player.updateBoard(player.getDisplayBoard());
          nextPiece = game.getNextPiece(player.getCurrent());
          player.setPiece(nextPiece.getPiece(), piece.getPosition());
          player.updateCurrent();
          newDisplayBoard = newDisplayBoardWithPiece(player.getPiece(), player.getBoard());
          player.updateDisplayBoard(newDisplayBoard);
          gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
          return games;
        }
        piece.setActivity(false);
        return games;
      }
      piece.setActivity(true);
      emitPieceNewLocation(io, game, player, piece, newLocation);
      break;
    case 'rotate':
      console.log('rotate');
      newLocation = rotatePiece(player.getBoard(), piece);
      if (piece.getPosition() === position) return games;
      piece.setLocation(newLocation);
      newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
      player.updateDisplayBoard(newDisplayBoard);
      gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
      break;
    default:
      break;
  }
  return games;
}

module.exports = {
  handleGamePieceMove,
};
