const { movePieceDown, movePieceLeft, movePieceRight } = require('../movement/movement');
const { rotatePiece } = require('../movement/rotation');
const { newDisplayBoardWithPiece } = require('./handleFirstPiece');
const { gamePlayersUpdateEmit } = require('../emits');

function emitPieceNewLocation(io, game, player, piece) {
  const newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
  player.updateDisplayBoard(newDisplayBoard);
  gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
}

function setNextPiece(game, player, piece) {
  player.updateBoard(player.getDisplayBoard());
  const nextPiece = game.getNextPiece(player.getCurrent());
  player.setPiece(nextPiece.getPiece(), piece.getPosition());
  player.updateCurrent();
  const newDisplayBoard = newDisplayBoardWithPiece(player.getPiece(), player.getBoard());
  player.updateDisplayBoard(newDisplayBoard);
}

function getGamePlayerPiece(games, gameID, playerID) {
  const game = games.find(g => g.getId() === gameID);
  const player = game.getPlayers().find(p => p.getId() === playerID);
  const piece = player.getPiece();
  return { game, player, piece };
}

function movePiece(io, games, gameID, playerID, moveFunc) {
  const { game, player, piece } = getGamePlayerPiece(games, gameID, playerID);
  if (!game || !player || !piece) return games;
  const newLocation = moveFunc(player.getBoard(), piece);
  if (newLocation === piece.getLocation()) return games;
  piece.setLocation(newLocation);
  emitPieceNewLocation(io, game, player, piece);
  return games;
}

function handleMovePieceDown(io, games, gameID, playerID) {
  const { game, player, piece } = getGamePlayerPiece(games, gameID, playerID);
  if (!game || !player || !piece) return games;
  const newLocation = movePieceDown(player.getBoard(), piece);
  if (newLocation === piece.getLocation()) {
    if (!piece.getActivity()) {
      setNextPiece(game, player, piece);
      gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
      return games;
    }
    piece.setActivity(false);
    return games;
  }
  piece.setActivity(true);
  piece.setLocation(newLocation);
  emitPieceNewLocation(io, game, player, piece);
  return games;
}

function handleRotatePiece(io, games, gameID, playerID) {
  const { game, player, piece } = getGamePlayerPiece(games, gameID, playerID);
  if (!game || !player || !piece) return games;
  const prevPosition = piece.getPosition();
  const newLocation = rotatePiece(player.getBoard(), piece);
  if (piece.getPosition() === prevPosition) return games;
  piece.setLocation(newLocation);
  const newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
  player.updateDisplayBoard(newDisplayBoard);
  gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
  return games;
}

function handleGamePieceMove(io, games, { gameID, playerID }, type) {
  switch (type) {
    case 'right':
      return movePiece(io, games, gameID, playerID, movePieceRight);
    case 'left':
      return movePiece(io, games, gameID, playerID, movePieceLeft);
    case 'down':
      return handleMovePieceDown(io, games, gameID, playerID);
    case 'rotate':
      return handleRotatePiece(io, games, gameID, playerID);
    default:
      break;
  }
  return games;
}

module.exports = {
  handleGamePieceMove,
};
