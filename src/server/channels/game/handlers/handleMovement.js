const { movePieceDown, movePieceLeft, movePieceRight } = require('../movement/movement');
const { rotatePiece } = require('../movement/rotation');
const { newDisplayBoardWithPiece } = require('./handleFirstPiece');
const { gamePlayersUpdateEmit } = require('../emits');

function emitPieceNewLocation(io, game, player, piece) {
  const newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
  player.updateDisplayBoard(newDisplayBoard);
  gamePlayersUpdateEmit(io, game);
}

function setNextPiece(game, player, piece) {
  player.updateBoard(player.getDisplayBoard());
  const nextPiece = game.getNextPiece(player.getCurrent());
  player.setPiece(nextPiece.getPiece(), piece.currentPosition());
  player.updateCurrent();
  const newDisplayBoard = newDisplayBoardWithPiece(player.getPiece(), player.getBoard());
  player.updateDisplayBoard(newDisplayBoard);
}

function findGamePlayerPiece(games, gameID, playerID) {
  const foundGame = games.find(game => game.getId() === gameID);
  const foundPlayer = foundGame.getPlayers().find(player => player.getId() === playerID);
  const foundPiece = foundPlayer.getPiece();
  return { game: foundGame, player: foundPlayer, piece: foundPiece };
}

function movePiece(io, games, gameID, playerID, moveFunc) {
  const { game, player, piece } = findGamePlayerPiece(games, gameID, playerID);
  const newPieceLocation = moveFunc(player.getBoard(), piece);
  if (newPieceLocation === piece.currentLocation()) return games;
  piece.setLocation(newPieceLocation);
  emitPieceNewLocation(io, game, player, piece);
  return games;
}

function handleMovePieceDown(io, games, gameID, playerID) {
  const { game, player, piece } = findGamePlayerPiece(games, gameID, playerID);
  const newPieceLocation = movePieceDown(player.getBoard(), piece);
  if (newPieceLocation === piece.currentLocation()) {
    if (!piece.getActivity()) {
      setNextPiece(game, player, piece);
      gamePlayersUpdateEmit(io, game);
      return games;
    }
    piece.setActivity(false);
    return games;
  }
  piece.setActivity(true);
  piece.setLocation(newPieceLocation);
  emitPieceNewLocation(io, game, player, piece);
  return games;
}

function handleRotatePiece(io, games, gameID, playerID) {
  const { game, player, piece } = findGamePlayerPiece(games, gameID, playerID);
  const prevPiecePosition = piece.currentPosition();
  const newPieceLocation = rotatePiece(player.getBoard(), piece);
  if (piece.currentPosition() === prevPiecePosition) return games;
  piece.setLocation(newPieceLocation);
  const newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
  player.updateDisplayBoard(newDisplayBoard);
  gamePlayersUpdateEmit(io, game);
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
