const { movePieceDown, movePieceLeft, movePieceRight } = require('../movement/movement');
const { addSolidRows, checkBoardForFullRows, removeFullRows } = require('../movement/utils');
const { verifyPlacement } = require('../movement/verify');
const { rotatePiece } = require('../movement/rotation');
const { newDisplayBoardWithPiece } = require('./handleFirstPiece');
const { gamePlayersUpdateEmit, gameSetActiveEmit } = require('../emits');

function emitPieceNewLocation(io, game, player, piece) {
  const newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
  player.updateDisplayBoard(newDisplayBoard);
  gamePlayersUpdateEmit(io, game);
}

function setNextPiece(io, game, player, piece) {
  player.updateBoard(player.getDisplayBoard());
  const nextPiece = game.getNextPiece(player.getCurrent());
  player.setPiece(nextPiece.getPiece(), piece.currentPosition());
  player.updateCurrent();
  const { letter, location, shape } = nextPiece.getInfo();
  if (verifyPlacement(location, shape, player.getBoard(), letter)) {
    const newDisplayBoard = newDisplayBoardWithPiece(player.getPiece(), player.getBoard());
    player.updateDisplayBoard(newDisplayBoard);
  } else {
    player.setActivity(false);
    if (game.getActivePlayers().length === 0) {
      game.endGame();
      gameSetActiveEmit(io, game);
    }
  }
}

function findGamePlayerPiece(games, gameID, playerID) {
  const foundGame = games.find(game => game.getId() === gameID);
  const foundPlayer = foundGame.getPlayers().find(player => player.getId() === playerID);
  const foundPiece = foundPlayer.getPiece();
  return { game: foundGame, player: foundPlayer, piece: foundPiece };
}

function verifyGamePlayerPiece(game, player, piece) {
  if (!game || !player || !piece) return false;
  if (!game.getActivity()) return false;
  if (!player.getActivity()) return false;
  return true;
}

function movePiece(io, games, gameID, playerID, moveFunc) {
  const { game, player, piece } = findGamePlayerPiece(games, gameID, playerID);
  if (!verifyGamePlayerPiece(game, player, piece)) return games;
  const newPieceLocation = moveFunc(player.getBoard(), piece);
  if (newPieceLocation === piece.currentLocation()) return games;
  piece.setLocation(newPieceLocation);
  emitPieceNewLocation(io, game, player, piece);
  return games;
}

function handleAddSolidRows(game, playerID, rowsToAdd) {
  const otherPlayers = game.getActivePlayers().filter(player => player.getId() !== playerID);
  otherPlayers.forEach((player) => {
    const updatedBoard = addSolidRows(player.getDisplayBoard(), rowsToAdd);
    player.updateDisplayBoard(updatedBoard);
  });
}

function handleMovePieceDown(io, games, gameID, playerID) {
  const { game, player, piece } = findGamePlayerPiece(games, gameID, playerID);
  if (!verifyGamePlayerPiece(game, player, piece)) return games;
  const newPieceLocation = movePieceDown(player.getBoard(), piece);
  if (newPieceLocation === piece.currentLocation()) {
    if (!piece.getActivity()) {
      const fullRows = checkBoardForFullRows(player.getDisplayBoard());
      if (fullRows.length > 0) {
        const cleanedBoard = removeFullRows(player.getDisplayBoard(), fullRows);
        player.updateDisplayBoard(cleanedBoard);
        // const rowsToAdd = fullRows.length - 1;
        // if (rowsToAdd > 0) handleAddSolidRows(game, playerID, rowsToAdd);
      }
      setNextPiece(io, game, player, piece);
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
  if (!verifyGamePlayerPiece(game, player, piece)) return games;
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
  handleAddSolidRows,
  handleGamePieceMove,
};
